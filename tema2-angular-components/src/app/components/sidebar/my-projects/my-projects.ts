import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Project, PROJECTS } from '../../../models/projects.model';

@Component({
  selector: 'app-my-projects',
  imports: [CommonModule],
  templateUrl: './my-projects.html',
  styleUrl: './my-projects.sass',
})
export class MyProjects {
  projects = PROJECTS;
}
