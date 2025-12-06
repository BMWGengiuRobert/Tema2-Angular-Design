import { Component } from '@angular/core';
import { AvatarPicture } from './avatar-picture/avatar-picture';
import { RoutesList } from './routes-list/routes-list';
import { CommonModule } from '@angular/common';
import { MyProjects } from './my-projects/my-projects';

@Component({
  selector: 'app-sidebar',
  imports: [AvatarPicture,CommonModule,RoutesList,MyProjects],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.sass',
})
export class Sidebar {
}
