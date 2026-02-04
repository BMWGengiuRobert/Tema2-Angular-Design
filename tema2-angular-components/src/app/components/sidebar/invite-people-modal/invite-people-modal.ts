import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { OpenModalService } from '../../../services/modal.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { User } from '../../../models/users.model';

@Component({
  selector: 'app-invite-people-modal',
  imports: [CommonModule, FormsModule, TranslateModule, TranslatePipe],
  templateUrl: './invite-people-modal.html',
  styleUrl: './invite-people-modal.sass',
})
export class InvitePeopleModal implements OnInit, OnDestroy {
  isModalOpen: boolean = false;
  newUser: User = {
    id: 0,
    firstName: '',
    lastName: '',
    color: '',
    password: '',
    email: '',
    username: ''
  }
  modalSubscription: Subscription = new Subscription();

  // Injecting services
  usersService: UsersService = inject(UsersService);
  openModalService: OpenModalService = inject(OpenModalService);
  translateService: TranslateService = inject(TranslateService);

  ngOnInit() {
    this.checkModalOpen();
    this.translateService.use(document.documentElement.lang || 'en');
  }

  checkModalOpen() {

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
    const newUserId: number = this.usersService.getUsers().length + 1;

    const userEmail: string = `${this.newUser.firstName.toLowerCase()}.${this.newUser.lastName.toLowerCase()}@example.com`;
    const emailAlreadyExists: boolean = this.usersService.getUsers().some(user => user.email === userEmail);
    if (emailAlreadyExists) {
      this.newUser.email = `${this.newUser.firstName.toLowerCase()}.${this.newUser.lastName.toLowerCase()}${newUserId}@example.com`;
    } else {
      this.newUser.email = userEmail;
    }

    const userName: string = `${this.newUser.firstName.toLowerCase()}.${this.newUser.lastName.toLowerCase()}`;
    const usernameAlreadyExists: boolean = this.usersService.getUsers().some(user => user.username === userName);
    if (usernameAlreadyExists) {
      this.newUser.username = `${this.newUser.firstName.toLowerCase()}.${this.newUser.lastName.toLowerCase()}${newUserId}`;
    } else {
      this.newUser.username = userName;
    }

    this.usersService.addUser({ ...this.newUser, id: newUserId, password: 'abcd1234A@' });
    this.newUser = {
      id: 0,
      firstName: '',
      lastName: '',
      color: '',
      password: '',
      email: '',
      username: ''
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