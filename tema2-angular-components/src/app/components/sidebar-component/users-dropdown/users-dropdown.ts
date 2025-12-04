import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User,USERS } from '../../../models/users.model';

@Component({
  selector: 'app-users-dropdown',
  imports: [CommonModule],
  templateUrl: './users-dropdown.html',
  styleUrl: './users-dropdown.sass',
})
export class UsersDropdown {
  users = USERS;
  
  @Input() selectedUserId?: number;
  @Output() userSelected = new EventEmitter<User>();

  onClickSelectUser(user: User) {
    this.userSelected.emit(user);
  }

  get availableUsers(): User[] {
    return this.users.filter(user => user.id !== this.selectedUserId);
  }
}
