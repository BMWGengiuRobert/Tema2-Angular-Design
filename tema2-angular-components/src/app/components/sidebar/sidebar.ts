import { Component } from '@angular/core';
import { AvatarPicture } from './avatar-picture/avatar-picture';
import { RoutesList } from './routes-list/routes-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [AvatarPicture,CommonModule,RoutesList],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.sass',
})
export class Sidebar {

}
