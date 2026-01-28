import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, FormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from "@angular/forms";
import { LanguagePicker } from "../home-page/language-picker/language-picker";
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { COUNTRIES_EN, COUNTRIES_RO, CountryAndItsCities, CountryAndItsCodes } from '../../models/countries.model';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-login-register-page',
  imports: [FormsModule, CommonModule, LanguagePicker, TranslateModule, TranslatePipe],
  templateUrl: './login-register-page.html',
  styleUrl: './login-register-page.sass',
})
export class LoginRegisterPage implements OnInit {

  countries: string[] = [];

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
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
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
    this.countriesService.getCountriesAndTheirCodes().subscribe(data => {
      this.rawCountriesAndTheirCodes = data;
      console.log(this.rawCountriesAndTheirCodes);
    });

    this.countriesService.getCountriesAndAllTheirCities().subscribe(data => {
      this.rawCountriesAndAllTheirCities = data;
      console.log(this.rawCountriesAndAllTheirCities);
    });
  }

  getCountryDialCode(countryName: string): string | null {
    const country = this.rawCountriesAndTheirCodes.find(c => c.name.toLowerCase() === countryName.toLowerCase());
    return country ? country.dial_code : null;
  }

  getCitiesForCountry(countryName: string): string[] {
    const country = this.rawCountriesAndAllTheirCities.find(c => c.country.toLowerCase() === countryName.toLowerCase());
    return country ? country.cities : [];
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

  //ngModel valueOnChange handlers
}
