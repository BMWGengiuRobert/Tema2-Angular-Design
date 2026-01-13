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
    this.modalSubscription = this.openModalService.isInvitePeopleModalOpen$.subscribe({
      next: (isOpen: boolean) => {
        this.isModalOpen = isOpen;
      },
      error: (err) => {
        console.error('Error receiving modal state:', err);
      },
      complete: () => {
        console.log('Completed receiving modal state.');
      }
    });
  }

  closeModal() {
    this.openModalService.closeInvitePeopleModal();
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
    this.openModalService.clickedOutsideInvitePeopleModal(event);
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }

}