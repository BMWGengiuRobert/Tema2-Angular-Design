import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReminderDbModel } from '../../../db/reminder-db.model';
import { Subscription } from 'rxjs';
import { UsersService } from '../../../services/users.service';
import { getRemindersByUserId } from '../../../db/mocked-db';
import { FormsModule } from '@angular/forms';
import { CustomDatePipe } from '../../../pipes/custom-date.pipe';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-my-reminders',
  imports: [FormsModule, CustomDatePipe, TranslateModule, TranslatePipe],
  templateUrl: './my-reminders.html',
  styleUrl: './my-reminders.sass',
})
export class MyReminders implements OnInit, OnDestroy {

  rawAllReminders: ReminderDbModel[] = [];
  reminders: { id: number; userId: number; name: string; dueDate: Date }[] = [];
  selectedDate: Date = new Date();
  private userSubcription: Subscription = new Subscription();

  constructor(private userService: UsersService, private translateService: TranslateService) { }

  ngOnInit(): void {

    this.translateService.onLangChange.subscribe(() => {
      this.updateRemindersWithTranslation();
      this.filterRemindersByDate();
    });

    this.userSubcription = this.userService.selectedUser$.subscribe(user => {
      this.rawAllReminders = getRemindersByUserId(user.id);
      this.updateRemindersWithTranslation();
      this.filterRemindersByDate();
    });

    this.translateService.use(document.documentElement.lang || 'en');
  }

  ngOnDestroy(): void {
    this.userSubcription.unsubscribe();
  }

  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedDate = new Date(input.value);
    this.filterRemindersByDate();
  }

  updateRemindersWithTranslation(): void {
    this.filterRemindersByDate();
  }

  filterRemindersByDate(): void {
    this.reminders = this.rawAllReminders
      .map(reminder => ({
        ...reminder,
        name: this.translateService.getCurrentLang() === 'en' ? reminder.name.en : reminder.name.ro
      }))
      .filter(reminder => {
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
