import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, FormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from "@angular/forms";
import { LanguagePicker } from "../home-page/language-picker/language-picker";
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { CountryAndItsCodes } from '../../models/countries.model';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-login-register-page',
  imports: [FormsModule, CommonModule, LanguagePicker, TranslateModule, TranslatePipe, ReactiveFormsModule],
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

  constructor(private formBuilder: FormBuilder, private countriesService: CountriesService) {
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

  onSubmitForm() {
    console.log('Submitting form...');
    if (this.accountForm.valid) {
      console.log('Form Submitted', this.accountForm.value);
      this.accountForm.reset();
    } else {
      console.log('Form is invalid');
      this.accountForm.markAllAsTouched();
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

    if (isAllDigitsSame) {
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
    if (this.isNewHere) {
      this.accountForm.reset();
    } else {
      this.accountForm.reset();
    }
  }

  //formdirty pt erori
  //fiecare eroare
  //sa nu apara la inceput
  //regex parola litera mare, cifra, caracter special semn punctuatie
}
