import { Component } from '@angular/core';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';
import { MyTasks } from './my-tasks/my-tasks';
import { MyGoals } from './my-goals/my-goals';
import { ProjectsCard } from './projects-card/projects-card';
import { CalendarCard } from './calendar-card/calendar-card';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';
import { User, USERS } from '../../models/users.model';

@Component({
  selector: 'app-home-page',
  imports: [CustomDatePipe, MyTasks, MyGoals, ProjectsCard, CalendarCard],
  templateUrl: './home-page.html',
  styleUrl: './home-page.sass',
})
export class HomePage {
  currentDate: Date = new Date();
  selectedUser: User = USERS[0];
  selectedUserSubscription: Subscription = new Subscription();

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.selectedUserSubscription = this.usersService.selectedUser$.subscribe(user => {
      this.selectedUser = user;
    });
  }

  ngOnDestroy() {
    this.selectedUserSubscription.unsubscribe();
  }
}