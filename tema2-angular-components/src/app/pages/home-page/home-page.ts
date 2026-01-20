import { Component } from '@angular/core';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';
import { MyTasks } from './my-tasks/my-tasks';
import { MyGoals } from './my-goals/my-goals';
import { ProjectsCard } from './projects-card/projects-card';
import { CalendarCard } from './calendar-card/calendar-card';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';
import { User, USERS } from '../../models/users.model';
import { MyReminders } from "./my-reminders/my-reminders";
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  imports: [CustomDatePipe, MyTasks, MyGoals, ProjectsCard, CalendarCard, MyReminders, TranslateModule, TranslatePipe],
  templateUrl: './home-page.html',
  styleUrl: './home-page.sass',
})
export class HomePage {
  currentDate: Date = new Date();
  selectedUser: User = USERS[0];
  selectedUserSubscription: Subscription = new Subscription();

  constructor(private usersService: UsersService, private translateService: TranslateService) {}

  ngOnInit() {
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

    this.translateService.use(document.documentElement.lang || 'en');
  }

  ngOnDestroy() {
    this.selectedUserSubscription.unsubscribe();
  }
}