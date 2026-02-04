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
    password: ''
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
    const newUserId = this.usersService.getUsers().length + 1;
    this.usersService.addUser({ ...this.newUser, id: newUserId, password: 'abcd1234A@' });
    this.newUser = {
      id: 0,
      firstName: '',
      lastName: '',
      color: '',
      password: ''
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