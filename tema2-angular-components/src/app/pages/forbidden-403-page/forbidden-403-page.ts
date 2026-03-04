import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forbidden-403-page',
  imports: [TranslateModule,TranslatePipe],
  templateUrl: './forbidden-403-page.html',
  styleUrl: './forbidden-403-page.sass',
})
export class Forbidden403Page {

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      this.translate.use(savedLang);
    }
  }

  goToHomePage(): void {
    this.router.navigate(['/home']);
  }
}
