import { Component, inject } from '@angular/core';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';
import { MyTasks } from './my-tasks/my-tasks';
import { MyGoals } from './my-goals/my-goals';
import { ProjectsCard } from './projects-card/projects-card';
import { CalendarCard } from './calendar-card/calendar-card';
import { UsersService } from '../../services/users.service';
import { Subscription, delay, tap, timeout } from 'rxjs';
import { User, USERS } from '../../models/users.model';
import { MyReminders } from "./my-reminders/my-reminders";
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LanguagePicker } from './language-picker/language-picker';
import { LoadingSpinner } from "../../components/loading-spinner/loading-spinner";
import { OpenModalService } from '../../services/modal.service';

@Component({
  selector: 'app-home-page',
  imports: [CustomDatePipe, MyTasks, MyGoals, ProjectsCard, CalendarCard, MyReminders, TranslateModule, TranslatePipe, LanguagePicker, LoadingSpinner],
  templateUrl: './home-page.html',
  styleUrl: './home-page.sass',
})
export class HomePage {
  currentDate: Date = new Date();
  selectedUser: User = USERS[0];
  selectedUserSubscription: Subscription = new Subscription();

  // Injecting services
  usersService: UsersService = inject(UsersService);
  translateService: TranslateService = inject(TranslateService);
  modalService: OpenModalService = inject(OpenModalService);

  ngOnInit() {
    this.getSelectedUser();
    this.closeLoadingSpinnerOnLangChange();
  }

  getSelectedUser() {
    this.selectedUserSubscription = this.usersService.selectedUser$.subscribe({
      next: (user: User) => {
        this.selectedUser = user;
      },
      error: (err) => {
        console.error('Error fetching selected user:', err);
      },
      complete: () => {
        console.log('Completed fetching selected user.');
      }
    });
  }

  closeLoadingSpinnerOnLangChange() {
    this.translateService.onLangChange.subscribe({
      next: () => {
        setTimeout(() => {
          this.modalService.closeLoadingSpinner();
        }, 2000);
      },
      error: (err) => {
        console.error('Error during language change:', err);
        this.modalService.closeLoadingSpinner();
      },
      complete: () => {
        console.log('Language change process completed.');
      }
    });
  }

  ngOnDestroy() {
    this.selectedUserSubscription.unsubscribe();
  }
}