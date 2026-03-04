import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-unauthorized-401',
  imports: [TranslateModule, TranslatePipe],
  templateUrl: './unauthorized-401.html',
  styleUrl: './unauthorized-401.sass',
})
export class Unauthorized401 {
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
