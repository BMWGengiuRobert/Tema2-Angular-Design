import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-internal-server-error-500',
  imports: [TranslateModule,TranslatePipe],
  templateUrl: './internal-server-error-500.html',
  styleUrl: './internal-server-error-500.sass',
})
export class InternalServerError500 {
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
