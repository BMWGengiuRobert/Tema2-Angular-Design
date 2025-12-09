import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MyProjectsService } from '../../../services/my-projects.service';
import { Project } from '../../../models/projects.model';
import { OpenModalService } from '../../../services/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-project-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-project-modal.html',
  styleUrl: './create-project-modal.sass',
})
export class CreateProjectModal implements OnInit, OnDestroy {

  isModalOpen: boolean = false;
  newProject: Project = { id: 0, name: '', color: '#000' };
  private modalSubscription: Subscription = new Subscription();

  constructor(private myProjectsService: MyProjectsService, private openModalService: OpenModalService) { }

  ngOnInit() {
    this.modalSubscription = this.openModalService.isCreateProjectModalOpen$.subscribe((isOpen) => {
      this.isModalOpen = isOpen;
    });
  }

  closeModal() {
    this.openModalService.closeCreateProjectModal();
  }

  createProject() {
    const newProjectId = this.myProjectsService.getProjects().length + 1;
    this.myProjectsService.addProject({ ...this.newProject, id: newProjectId });
    this.newProject = { id: 0, name: '', color: '#000000' };
    this.closeModal();
  }

  clickedOutsideModal(event: MouseEvent) {
    this.openModalService.clickedOutsideCreateProjectModal(event);
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }
}
