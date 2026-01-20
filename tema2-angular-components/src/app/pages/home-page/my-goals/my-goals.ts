import { Component, OnDestroy, OnInit } from '@angular/core';
import { GoalDBModel } from '../../../db/goal-db.model';
import { Subscription } from 'rxjs';
import { UsersService } from '../../../services/users.service';
import { getGoalsByUserId, getProjectById } from '../../../db/mocked-db';
import { ProjectDBModel } from '../../../db/project-db.model';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-my-goals',
  imports: [CommonModule, TranslateModule, TranslatePipe],
  templateUrl: './my-goals.html',
  styleUrl: './my-goals.sass',
})
export class MyGoals implements OnInit, OnDestroy {

  goals: GoalDBModel[] = [];
  private userSubscription: Subscription = new Subscription();

  constructor(private userService: UsersService, private translateService: TranslateService) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.selectedUser$.subscribe({
      next: (selectedUser) => {
        this.goals = getGoalsByUserId(selectedUser.id);
      },
      error: (err) => {
        console.error('Error fetching user goals:', err);
      },
      complete: () => {
        console.log('Completed fetching user goals.');
      }
    });

    this.translateService.use(document.documentElement.lang || 'en');
  }

  getProjectNameById(projectId: number): string {
    const project: ProjectDBModel | undefined = getProjectById(projectId);
    return project ? project.name : 'Unknown Project';
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
