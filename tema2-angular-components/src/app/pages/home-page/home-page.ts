import { Component } from '@angular/core';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';

@Component({
  selector: 'app-home-page',
  imports: [CustomDatePipe],
  templateUrl: './home-page.html',
  styleUrl: './home-page.sass',
})
export class HomePage {
  currentDate: Date = new Date();
}
