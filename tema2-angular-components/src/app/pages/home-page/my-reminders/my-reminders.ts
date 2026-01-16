import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReminderDbModel } from '../../../db/reminder-db.model';
import { Subscription } from 'rxjs';
import { UsersService } from '../../../services/users.service';
import { getRemindersByUserId } from '../../../db/mocked-db';
import { FormsModule } from '@angular/forms';
import { CustomDatePipe } from '../../../pipes/custom-date.pipe';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-my-reminders',
  imports: [FormsModule, CustomDatePipe, TranslateModule],
  templateUrl: './my-reminders.html',
  styleUrl: './my-reminders.sass',
})
export class MyReminders implements OnInit, OnDestroy {

  allReminders: ReminderDbModel[] = [];
  reminders: ReminderDbModel[] = [];
  selectedDate: Date = new Date();
  private userSubcription: Subscription = new Subscription();

  constructor(private userService: UsersService, translateService: TranslateService){
    const currentLang = document.documentElement.lang || 'en';
    const lang = currentLang.includes('ro') ? 'ro' : 'en';
    translateService.use(lang);
  }

  ngOnInit(): void {
    this.userSubcription = this.userService.selectedUser$.subscribe(user => {
      this.allReminders = getRemindersByUserId(user.id);
      this.filterRemindersByDate();
    });
  }
  
  ngOnDestroy(): void {
    this.userSubcription.unsubscribe();
  }

  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedDate = new Date(input.value);
    this.filterRemindersByDate();
  }

  filterRemindersByDate(): void {
    this.reminders = this.allReminders.filter(reminder => {
      const reminderDate = new Date(reminder.dueDate);
      return this.isSameDay(reminderDate, this.selectedDate);
    });
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }

  isToday(): boolean {
    const today = new Date();
    return this.isSameDay(this.selectedDate, today);
  }

  dateInputValue(): string {
    return this.selectedDate.toISOString().split('T')[0];
  }
}
