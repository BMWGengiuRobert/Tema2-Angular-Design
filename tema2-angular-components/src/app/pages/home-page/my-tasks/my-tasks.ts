import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskDBModel } from '../../../db/task-db.model';
import { Subscription } from 'rxjs';
import { UsersService } from '../../../services/users.service';
import { getTasksByUserId } from '../../../db/mocked-db';
import { TaskDueDatePipe } from "../../../pipes/task-dueDate.pipe";
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-my-tasks',
  imports: [TaskDueDatePipe, TranslateModule, TranslatePipe],
  templateUrl: './my-tasks.html',
  styleUrl: './my-tasks.sass',
})
export class MyTasks implements OnInit, OnDestroy {

  rawTasks: TaskDBModel[] = [];
  tasks: { id: number; projectId: number; userId: number; priority: 'High' | 'Medium' | 'Low'; dueDate: Date; name: string }[] = [];
  private userSubscription: Subscription = new Subscription();

  constructor(private userService: UsersService, private translateService: TranslateService) {}

  ngOnInit(): void {

    this.translateService.onLangChange.subscribe( {
      next: () => {
        this.updateTasksWithTranslation();
      },
      error: (err) => {
        console.error('Error during language change:', err);
      },
      complete: () => {
        console.log('Language change handling completed.');
      }
    });


    this.userSubscription = this.userService.selectedUser$.subscribe({
      next: (selectedUser) => {
        this.rawTasks = getTasksByUserId(selectedUser.id);
        this.updateTasksWithTranslation();
      },  
      error: (err) => {
        console.error('Error fetching user tasks:', err);
      },
      complete: () => {
        console.log('Completed fetching user tasks.');
      }
    });

    this.translateService.use(document.documentElement.lang || 'en');
  }
  
  updateTasksWithTranslation(): void {
    this.tasks = this.rawTasks.map(task => ({
      ...task,
      name: this.translateService.getCurrentLang() === 'en' ? task.name.en : task.name.ro
    }));
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}

