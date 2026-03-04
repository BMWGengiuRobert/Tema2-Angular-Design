import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, FormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from "@angular/forms";
import { LanguagePicker } from "../home-page/language-picker/language-picker";
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { CountryAndItsCodes } from '../../models/countries.model';
import { CountriesService } from '../../services/countries.service';
import { Router } from '@angular/router';
import { FormUserData, LoginData } from '../../models/formData.model';
import { CheckPermissionService } from '../../services/check-permission.service';
import { UsersService } from '../../services/users.service';
import { LoadingSpinner } from "../../components/loading-spinner/loading-spinner";
import { OpenModalService } from '../../services/modal.service';
import { StorageService } from '../../services/storage.service';
import { User } from '../../models/users.model';

@Component({
  selector: 'app-login-register-page',
  imports: [FormsModule, CommonModule, LanguagePicker, TranslateModule, TranslatePipe, ReactiveFormsModule, LoadingSpinner],
  templateUrl: './login-register-page.html',
  styleUrl: './login-register-page.sass',
})
export class LoginRegisterPage implements OnInit {

  countries: string[] = [];
  selectedCountry: string = '';
  selectedCity: string = '';
  citiesForSelectedCountry: string[] = [];

  backgroundImagesLight: string[] = [
    "assets/login-register-patterns/pattern-login-light-0.jpg",
    "assets/login-register-patterns/pattern-login-light-1.jpg",
    "assets/login-register-patterns/pattern-login-light-2.jpg"
  ]

  backgroundImagesDark: string[] = [
    "assets/login-register-patterns/pattern-login-dark-0.jpg",
    "assets/login-register-patterns/pattern-login-dark-1.jpg",
    "assets/login-register-patterns/pattern-login-dark-2.jpg"
  ]

  index = signal(1);
  currentIndex: number = 1;
  isLightMode: boolean = true;
  isNewHere: boolean = false;
  processedImageUrls: string[] = [];
  accountForm: FormGroup;

  //Injecting services
  countriesService: CountriesService = inject(CountriesService);
  router: Router = inject(Router);
  checkPermissionService: CheckPermissionService = inject(CheckPermissionService);
  modalService: OpenModalService = inject(OpenModalService);
  usersService: UsersService = inject(UsersService);
  storageService: StorageService = inject(StorageService);

  constructor(private formBuilder: FormBuilder) {
    this.accountForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/), this.validatePasswordPattern]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      city: [{ value: '', disabled: true }, Validators.required],
      homeAddress: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      phoneNumber: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^\+?\d{1,4}?[-.\s]?\d{7,12}$/)]],
      luckyNumber: ['', [Validators.required, Validators.min(7), Validators.max(77777), this.validateLuckyNumber]],
      rememberMe: [false]
    }, { validators: this.validatePasswordMatch });
  }

  ngOnInit() {
    setInterval(() => {
      this.index.set(this.index() === 2 ? 0 : this.index() + 1);
    }, 2000);

    this.changeMode();
    this.processedImageUrls = this.getBackgroundImages();
    this.processCountryList();
    this.updateFormValidators();
  }

  getBackgroundImages() {
    return this.isLightMode ? this.backgroundImagesLight : this.backgroundImagesDark;
  }

  isNewHerePressed() {
    this.isNewHere = !this.isNewHere;
    this.updateFormValidators();
  }

  changeMode() {
    this.isLightMode = localStorage.getItem('theme') === 'light';
  }

  processCountryList() {
    this.countriesService.getAllCountries().subscribe({
      next: (countriesData: any[]) => {
        this.countries = countriesData;
      },
      error: (err) => {
        this.countries = [];
        console.error('Error fetching countries:', err);
      }
    });
  }

  onCountryChange(countryName: string) {
    if (countryName) {
      this.selectedCity = '';
      this.accountForm.get('city')?.enable();
      this.accountForm.get('phoneNumber')?.enable();

      this.countriesService.getCitiesForCountry(countryName).subscribe({
        next: (cities: string[]) => {
          this.citiesForSelectedCountry = cities;
        },
        error: (err) => {
          this.citiesForSelectedCountry = [];
          console.error('Error fetching cities for country:', err);
        }
      });

      this.countriesService.getSingleCountryCodes(countryName).subscribe({
        next: (countryCodes: CountryAndItsCodes) => {
          const dialCode = countryCodes.dial_code;
          this.accountForm.patchValue({ phoneNumber: dialCode });
        },
        error: (err) => {
          console.error('Error fetching country codes:', err);
        }
      });

    } else {
      this.citiesForSelectedCountry = [];
    }
  }

  logInUser(loginCredentials: LoginData, rememberMe: boolean) {

    const user = this.checkPermissionService.checkValidCredentials(loginCredentials);
    if (!user) {
      const passwordControl = this.accountForm.get('password');
      passwordControl?.setErrors({ invalidCredentials: true });
      passwordControl?.markAsDirty();
      passwordControl?.markAsTouched();

      this.accountForm.get('password')?.setErrors({ invalidCredentials: true });
      return;
    }

    // log in the user
    this.usersService.setSelectedUser(user);

    if (rememberMe) {
      this.storageService.setItem('rememberedUsername', loginCredentials.username);
    }
    else {
      this.storageService.removeItem('rememberedUsername');
    }

    this.modalService.openLoadingSpinner();

    setTimeout(() => {
      this.modalService.closeLoadingSpinner();
      this.updateFormValidators();
      this.router.navigate(['/home']);
      this.accountForm.reset();
    }, 500);

  }

  //value change in form observable

  createNewUser(newUser: FormUserData) {

    const userFromDb: User = {
      id: this.usersService.getUsers().length + 1,
      firstName: newUser.username,
      lastName: newUser.username,
      color: '#' + Math.floor(Math.random() * 16777215).toString(16),
      password: newUser.password,
      email: newUser.email,
      username: newUser.username
    }

    this.usersService.addUser(userFromDb);

    this.modalService.openLoadingSpinner();

    setTimeout(() => {
      this.modalService.closeLoadingSpinner();
      this.logInUser({ username: newUser.username, password: newUser.password }, false);
      this.updateFormValidators();
    }, 500);
  }

  onSubmitForm() {

    // form is for loggig in
    if (!this.isNewHere) {

      if (this.accountForm.valid) {

        const { username, password, rememberMe } = this.accountForm.value;

        const loginCredentials: LoginData = {
          username: username,
          password: password
        };

        this.logInUser(loginCredentials, rememberMe);

      } else {
        console.log('Form is invalid');
        this.accountForm.markAllAsTouched();
      }
    } else {

      // form is for registering new user 
      if (this.accountForm.valid) {

        const { email, username, password, confirmPassword, homeAddress, zipcode, country, city, phoneNumber, luckyNumber } = this.accountForm.value;

        const newUserFromForm: FormUserData = {
          username,
          password,
          confirmPassword,
          email,
          country,
          city,
          homeAddress,
          zipCode: zipcode,
          phoneNumber,
          luckyNumber
        }

        this.createNewUser(newUserFromForm);
      } else {
        console.log('Form is invalid');
        this.accountForm.markAllAsTouched();
      }
    }
  }

  // FORM CUSTOM VALIDATORS
  validatePasswordMatch(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (group.get('confirmPassword')?.disabled) {
      return null;
    }

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  validateLuckyNumber(control: AbstractControl): ValidationErrors | null {
    const luckyNumber = control.value;

    const isAllDigitsSame = luckyNumber?.toString().split('').every((digit: string) => digit === luckyNumber.toString()[0]);

    if (isAllDigitsSame && luckyNumber.toString().length >= 2) {
      return { allDigitsSame: true };
    }

    return null;
  }

  validatePasswordPattern(control: AbstractControl): ValidationErrors | null {
    const password = control.value;

    if (!password) return null;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);

    if (!hasUpperCase) {
      return { missingUppercase: true };
    }

    if (!hasNumber) {
      return { missingNumber: true };
    }

    if (!hasSpecialChar) {
      return { missingSpecialChar: true };
    }

    return null;
  }

  // GLOBAL FUNCTION TO CHECK FOR ERRORS
  checkForErrors(controlName: string, errorName: string) {
    const control = this.accountForm.get(controlName);

    if (control?.hasError(errorName) && (control.touched || control.dirty)) {
      return true;
    }

    if (this.accountForm.hasError(errorName) && (control?.touched || control?.dirty)) {
      return true;
    }

    return false;
  }

  updateFormValidators() {
    const fieldsForRegister = ['confirmPassword', 'country', 'city', 'homeAddress', 'zipCode', 'phoneNumber', 'luckyNumber', 'email'];

    this.accountForm.reset();

    if (this.isNewHere) {
      fieldsForRegister.forEach(field => {
        this.accountForm.get(field)?.enable();
      });
    } else {
      fieldsForRegister.forEach(field => {
        this.accountForm.get(field)?.disable();
      });
    }
  }
}
