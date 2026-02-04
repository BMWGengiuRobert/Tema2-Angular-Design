import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OpenModalService } from '../../../services/modal.service';
import { Subscription } from 'rxjs';
import { addProject, getProjects } from '../../../db/mocked-db';
import { UsersService } from '../../../services/users.service';
import { ProjectDBModel } from '../../../db/project-db.model';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-project-modal',
  imports: [CommonModule, FormsModule, TranslateModule, TranslatePipe],
  templateUrl: './create-project-modal.html',
  styleUrl: './create-project-modal.sass',
})
export class CreateProjectModal implements OnInit, OnDestroy {

  isModalOpen: boolean = false;
  newProject: ProjectDBModel = { id: 0, userId: 0, noOfTeammates: 0, name: { en: '', ro: '' }, color: '#000' };
  projectName: string = '';
  private modalSubscription: Subscription = new Subscription();
  private userSubscription: Subscription = new Subscription();

  // Injecting services
  usersService: UsersService = inject(UsersService);
  openModalService: OpenModalService = inject(OpenModalService);
  translateService: TranslateService = inject(TranslateService);

  ngOnInit() {
    this.checkCreateProjectModalOpen();
    this.getIdOfSelectedUser();
    this.translateService.use(document.documentElement.lang || 'en');
  }

  checkCreateProjectModalOpen() {
    this.modalSubscription = this.openModalService.isCreateProjectModalOpen$.subscribe(
      {
        next: (isOpen: boolean) => {
          this.isModalOpen = isOpen;
        },
        error: (err) => {
          console.error('Error receiving modal state:', err);
        },
        complete: () => {
          console.log('Completed receiving modal state.');
        }
      }
    );
  }

  getIdOfSelectedUser() {
    this.userSubscription = this.usersService.selectedUser$.subscribe(
      {
        next: (user) => {
          if (user) {
            this.newProject.userId = user.id;
          }
        },
        error: (err) => {
          console.error('Error receiving selected user:', err);
        },
        complete: () => {
          console.log('Completed receiving selected user.');
        }
      }
    );

  }

  closeModal() {
    this.openModalService.closeCreateProjectModal();
  }

  createProject() {
    const newProjectId = getProjects().length + 1;
    addProject({
      ...this.newProject,
      name: {
        en: this.projectName,
        ro: this.projectName
      },
      id: newProjectId
    });
    this.usersService.refreshSelectedUser();
    this.newProject = { id: 0, userId: 0, noOfTeammates: 0, name: { en: '', ro: '' }, color: '#000' };
    this.closeModal();
  }

  clickedOutsideModal(event: MouseEvent) {
    this.openModalService.clickedOutsideCreateProjectModal(event);
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
