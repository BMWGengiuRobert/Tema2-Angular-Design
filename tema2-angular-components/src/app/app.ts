import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  protected readonly title = signal('tema2-angular-components');

  constructor(private translate: TranslateService) {
    console.log('Default language:', this.translate.getFallbackLang());
    console.log('Current language:', this.translate.getCurrentLang());
    console.log('Available languages:', this.translate.getLangs());
  }
}
