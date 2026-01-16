import { Component, OnDestroy, OnInit } from '@angular/core';
import { GoalDBModel } from '../../../db/goal-db.model';
import { Subscription } from 'rxjs';
import { UsersService } from '../../../services/users.service';
import { getGoalsByUserId, getProjectById } from '../../../db/mocked-db';
import { ProjectDBModel } from '../../../db/project-db.model';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-my-goals',
  imports: [CommonModule, TranslateModule],
  templateUrl: './my-goals.html',
  styleUrl: './my-goals.sass',
})
export class MyGoals implements OnInit, OnDestroy {

  goals: GoalDBModel[] = [];
  private userSubscription: Subscription = new Subscription();

  constructor(private userService: UsersService, translateService: TranslateService) {
    const currentLang = document.documentElement.lang || 'en';
    const lang = currentLang.includes('ro') ? 'ro' : 'en';
    translateService.use(lang);
   }

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
  }

  getProjectNameById(projectId: number): string {
    const project: ProjectDBModel | undefined = getProjectById(projectId);
    return project ? project.name : 'Unknown Project';
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
