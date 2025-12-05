import { Component } from '@angular/core';
import { AvatarPicture } from './avatar-picture/avatar-picture';

@Component({
  selector: 'app-sidebar',
  imports: [AvatarPicture],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.sass',
})
export class Sidebar {

}
