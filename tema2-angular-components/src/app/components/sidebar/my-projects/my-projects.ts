import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PROJECTS } from '../../../models/projects.model';
import { CreateProjectModal } from '../../create-project-modal/create-project-modal';
import { OpenModalService } from '../../../services/my-projects-modal.service';

@Component({
  selector: 'app-my-projects',
  imports: [CommonModule, CreateProjectModal],
  templateUrl: './my-projects.html',
  styleUrl: './my-projects.sass',
})
export class MyProjects {
  projects = PROJECTS;

  constructor(private openModalService: OpenModalService) {}

  openModal() {
    this.openModalService.openModal();
  }
}
