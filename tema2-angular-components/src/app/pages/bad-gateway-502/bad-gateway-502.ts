import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-bad-gateway-502',
  imports: [TranslateModule, TranslatePipe],
  templateUrl: './bad-gateway-502.html',
  styleUrl: './bad-gateway-502.sass',
})
export class BadGateway502 {
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
