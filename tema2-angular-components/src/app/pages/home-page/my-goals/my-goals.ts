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

  rawGoals: GoalDBModel[] = [];
  goals: { id: number; userId: number; projectId: number; percentageCompleted: number; name: string }[] = [];
  private userSubscription: Subscription = new Subscription();

  constructor(private userService: UsersService, private translateService: TranslateService) {}

  ngOnInit(): void {

    this.translateService.onLangChange.subscribe( {
      next: () => {
        this.updateGoalsWithTranslation();
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
        this.rawGoals = getGoalsByUserId(selectedUser.id);
        this.updateGoalsWithTranslation();
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

  private updateGoalsWithTranslation(): void {
    this.goals = this.rawGoals.map(goal => ({
      ...goal,
      name: this.translateService.getCurrentLang() === 'en' ? goal.name.en : goal.name.ro
    }));
  }

  getProjectNameById(projectId: number): string {
    const project: ProjectDBModel | undefined = getProjectById(projectId);
    return project ? (this.translateService.getCurrentLang() === 'en' ? project.name.en : project.name.ro) : 'Unknown Project';
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
