import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-not-found-404',
  imports: [TranslateModule,TranslatePipe],
  templateUrl: './not-found-404.html',
  styleUrl: './not-found-404.sass',
})
export class NotFound404 {

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
