import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs/internal/Subscription';
import { UsersService } from '../../../services/users.service';
import { ProjectDBModel } from '../../../db/project-db.model';
import { getProjectsByUserId } from '../../../db/mocked-db';
import { getTasksByProjectId } from '../../../db/mocked-db';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-projects-card',
  imports: [CommonModule, TranslateModule, TranslatePipe],
  templateUrl: './projects-card.html',
  styleUrl: './projects-card.sass',
})
export class ProjectsCard implements OnInit, OnDestroy {

  rawProjects: ProjectDBModel[] = [];
  projects: {id: number, userId: number, noOfTeammates: number, name: string, color: string}[] = [];
  private userSubscription: Subscription = new Subscription();

  constructor(private userService: UsersService, private translateService: TranslateService) {}

  ngOnInit(): void {

    this.translateService.onLangChange.subscribe({
      next: () => {
        this.updateProjectsWithTranslation();
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
        this.rawProjects = getProjectsByUserId(selectedUser.id);
        this.updateProjectsWithTranslation();
      },
      error: (err) => {
        console.error('Error fetching user projects:', err);
      },
      complete: () => {
        console.log('Completed fetching user projects.');
      }
    });

    this.translateService.use(document.documentElement.lang || 'en');
  }

  updateProjectsWithTranslation(): void {
    this.projects = this.rawProjects.map(project => ({ 
      ...project, 
      name: this.translateService.getCurrentLang() === 'en' ? project.name.en : project.name.ro 
    }));
  }

  getTasksByProjectId(projectId: number): number {
    return getTasksByProjectId(projectId).length;
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
