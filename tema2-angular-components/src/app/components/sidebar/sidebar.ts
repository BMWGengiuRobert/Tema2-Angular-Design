import { Component } from '@angular/core';
import { AvatarPicture } from './avatar-picture/avatar-picture';
import { RoutesList } from './routes-list/routes-list';
import { CommonModule } from '@angular/common';
import { MyProjects } from './my-projects/my-projects';
import { OpenModalService } from '../../services/modal.service';
import { InvitePeopleModal } from './invite-people-modal/invite-people-modal';

@Component({
  selector: 'app-sidebar',
  imports: [AvatarPicture, CommonModule, RoutesList, MyProjects, InvitePeopleModal],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.sass',
})
export class Sidebar {
  constructor(private openModalService: OpenModalService) { }

  openModal() {
    this.openModalService.openModal();
  }
}
