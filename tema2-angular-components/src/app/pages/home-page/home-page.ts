import { Component } from '@angular/core';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';
import { MyTasks } from './my-tasks/my-tasks';
import { MyGoals } from './my-goals/my-goals';
import { ProjectsCard } from './projects-card/projects-card';
import { CalendarCard } from './calendar-card/calendar-card';

@Component({
  selector: 'app-home-page',
  imports: [CustomDatePipe, MyTasks, MyGoals, ProjectsCard,CalendarCard],
  templateUrl: './home-page.html',
  styleUrl: './home-page.sass',
})
export class HomePage {
  currentDate: Date = new Date();
}
