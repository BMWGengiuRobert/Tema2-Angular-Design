import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateProjectModal } from '../create-project-modal/create-project-modal';
import { OpenModalService } from '../../../services/modal.service';
import { getProjectsByUserId } from '../../../db/mocked-db';
import { UsersService } from '../../../services/users.service';
import { ProjectDBModel } from '../../../db/project-db.model';
import { Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-my-projects',
  imports: [CommonModule, CreateProjectModal, TranslateModule],
  templateUrl: './my-projects.html',
  styleUrl: './my-projects.sass',
})
export class MyProjects implements OnInit, OnDestroy {
  projects = [] as ProjectDBModel[];
  private userSubscription: Subscription = new Subscription();

  constructor(private openModalService: OpenModalService, private userService: UsersService, translateService: TranslateService) { 
    const currentLang = document.documentElement.lang || 'en';
    const lang = currentLang.includes('ro') ? 'ro' : 'en';
    translateService.use(lang);
  }

  ngOnInit() {
    this.userSubscription = this.userService.selectedUser$.subscribe({
      next: (selectedUser) => {
        this.projects = getProjectsByUserId(selectedUser.id);
      },
      error: (err) => {
        console.error('Error fetching user projects:', err);
      },
      complete: () => {
        console.log('Completed fetching user projects.');
      }
    });
  }

  openModal() {
    this.openModalService.openCreateProjectModal();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
