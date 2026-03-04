import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CreateProjectModal } from '../create-project-modal/create-project-modal';
import { OpenModalService } from '../../../services/modal.service';
import { getProjectsByUserId } from '../../../db/mocked-db';
import { UsersService } from '../../../services/users.service';
import { ProjectDBModel } from '../../../db/project-db.model';
import { Subscription } from 'rxjs';
import { TranslateService, TranslatePipe, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-my-projects',
  imports: [CommonModule, CreateProjectModal, TranslatePipe, TranslateModule],
  templateUrl: './my-projects.html',
  styleUrl: './my-projects.sass',
})

export class MyProjects implements OnInit, OnDestroy {
  rawProjects: ProjectDBModel[] = [];
  projects: { id: number; userId: number; noOfTeammates: number; name: string; color: string }[] = [];
  private userSubscription: Subscription = new Subscription();

  //Injecting services
  openModalService: OpenModalService = inject(OpenModalService);
  userService: UsersService = inject(UsersService);
  translateService: TranslateService = inject(TranslateService);

  ngOnInit() {
    this.getRawProjectsOfSelectedUser();
    this.onLangChangeUpdateProjects();
    this.translateService.use(document.documentElement.lang || 'en');
  }

  onLangChangeUpdateProjects() {
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
  }

  getRawProjectsOfSelectedUser() {
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
  }

  updateProjectsWithTranslation(): void {
    this.projects = this.rawProjects.map(project => ({
      ...project,
      name: this.translateService.getCurrentLang() === 'en' ? project.name.en : project.name.ro
    }));
  }

  openModal() {
    this.openModalService.openCreateProjectModal();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
