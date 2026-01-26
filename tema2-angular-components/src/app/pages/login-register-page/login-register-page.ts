import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { LanguagePicker } from "../home-page/language-picker/language-picker";
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login-register-page',
  imports: [FormsModule, CommonModule, LanguagePicker, TranslateModule, TranslatePipe],
  templateUrl: './login-register-page.html',
  styleUrl: './login-register-page.sass',
})
export class LoginRegisterPage implements OnInit {

  backgroundImages: string[] = [
    "assets/login-register-patterns/pattern-login-light-0.jpg",
    "assets/login-register-patterns/pattern-login-light-1.jpg"
  ]

  index = signal(1);
  currentIndex: number = 1;

  ngOnInit() {
    setInterval(() => {
      this.index.set(this.index() === 1 ? 0 : 1);
    }, 2000);
  }

}
