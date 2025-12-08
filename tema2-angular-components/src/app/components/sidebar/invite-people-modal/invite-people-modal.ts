import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { OpenModalService } from '../../../services/modal.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-invite-people-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './invite-people-modal.html',
  styleUrl: './invite-people-modal.sass',
})
export class InvitePeopleModal {
  isModalOpen: boolean = false;
  newUser = {
    id: 0,
    firstName: '',
    lastName: '',
    color: ''
  }
  modalSubscription: Subscription = new Subscription();

  constructor(private usersService: UsersService, private openModalService: OpenModalService) { }

  ngOnInit() {
    this.modalSubscription = this.openModalService.isModalOpen$.subscribe((isOpen) => {
      this.isModalOpen = isOpen;
    });
}

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }

  closeModal() {
    this.openModalService.closeModal();
  }

  inviteUser() {
    const newUserId = this.usersService.getUsers().length + 1;
    this.usersService.addUser({ ...this.newUser, id: newUserId });
    this.newUser = {
      id: 0,
      firstName: '',
      lastName: '',
      color: ''
    };
    this.closeModal();
  }

  clickedOutsideModal(event: MouseEvent) {
    this.openModalService.clickedOutsideModal(event);
  }
}