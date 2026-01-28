import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, FormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from "@angular/forms";
import { LanguagePicker } from "../home-page/language-picker/language-picker";
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { COUNTRIES_EN, COUNTRIES_MAPPING, COUNTRIES_RO, CountryAndItsCities, CountryAndItsCodes } from '../../models/countries.model';
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

  rawCountriesAndAllTheirCities: CountryAndItsCities[] = [];
  rawCountriesAndTheirCodes: CountryAndItsCodes[] = [];
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

  constructor(private translateService: TranslateService, private formBuilder: FormBuilder, private countriesService: CountriesService) {
    this.accountForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), this.validatePasswordMatch]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      homeAddress: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?\d{1,4}?[-.\s]?\d{7,12}$/)]],
      luckyNumber: ['', [Validators.required, Validators.min(1), Validators.max(100), this.validateLuckyNumber]],
    });
  }

  ngOnInit() {
    setInterval(() => {
      this.index.set(this.index() === 2 ? 0 : this.index() + 1);
    }, 2000);

    this.changeMode();

    this.translateService.onLangChange.subscribe({
      next: () => {
        this.changeCountryList();
      },
      error: (err) => {
        console.error('Error during language change:', err);
      },
      complete: () => {
        console.log('Language change handling completed.');
      }
    })

    this.processedImageUrls = this.getBackgroundImages();

    this.processCountriesData();
  }

  getBackgroundImages() {
    return this.isLightMode ? this.backgroundImagesLight : this.backgroundImagesDark;
  }

  isNewHerePressed() {
    this.isNewHere = !this.isNewHere;
  }

  changeCountryList() {
    if (this.translateService.getCurrentLang() === 'ro') {
      this.countries = COUNTRIES_RO;
    } else {
      this.countries = COUNTRIES_EN;
    }
  }

  changeMode() {
    this.isLightMode = localStorage.getItem('theme') === 'light';
  }

  processCountriesData() {
    this.countriesService.getAllCountries().subscribe(data => {
      this.rawCountriesAndAllTheirCities = data;
    });
  }

  countryNameOnEnglishForDialCode(countryName: string): string {
    const found = COUNTRIES_MAPPING.find(c =>
      c.ro.toLowerCase() === countryName.toLowerCase() ||
      c.en.toLowerCase() === countryName.toLowerCase()
    );

    return found?.en || countryName;
  }

  onCountryChange(countryName: string) {
    if (countryName) {
      this.selectedCity = '';

      const countryNameInEnglish = this.countryNameOnEnglishForDialCode(countryName).toLowerCase();

      this.countriesService.getCitiesForCountry(countryNameInEnglish).subscribe({
        next: (cities: string[]) => {
          this.citiesForSelectedCountry = cities;
        },
        error: (err) => {
          this.citiesForSelectedCountry = [];
          console.error('Error fetching cities for country:', err);
        }
      });

      this.countriesService.getSingleCountryCodes(countryNameInEnglish).subscribe({
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

  // FORM CUSTOM VALIDATORS
  validatePasswordMatch(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  validateLuckyNumber(group: AbstractControl): ValidationErrors | null {
    const luckyNumber = group.get('luckyNumber')?.value;

    const isAllDigitsSame = luckyNumber?.toString().split('').every((digit: string) => digit === luckyNumber.toString()[0]);

    if (isAllDigitsSame) {
      return { allDigitsSame: true };
    }

    return null;
  }

}
