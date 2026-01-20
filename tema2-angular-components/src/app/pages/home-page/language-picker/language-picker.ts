import { Component } from '@angular/core';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-picker',
  imports: [CommonModule, TranslateModule,TranslatePipe],
  templateUrl: './language-picker.html',
  styleUrl: './language-picker.sass',
})
export class LanguagePicker {
  isOpen = false;
  currentLang = 'en';
  
  languages = [
    { code: 'en', name: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
    { code: 'ro', name: 'Română', flag: 'https://flagcdn.com/w40/ro.png' },
    { code: 'de', name: 'Deutsch', flag: 'https://flagcdn.com/w40/de.png' },
  ];

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.getCurrentLang() || 'en';
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectLanguage(langCode: string) {
    this.currentLang = langCode;
    this.translate.use(langCode);
    this.isOpen = false;
  }

  getCurrentLanguage() {
    return this.languages.find(lang => lang.code === this.currentLang);
  }
}
