import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User, USERS } from '../../models/users.model';

@Component({
  selector: 'app-users-dropdown',
  imports: [CommonModule],
  templateUrl: './users-dropdown.html',
  styleUrl: './users-dropdown.sass',
})
export class UsersDropdown {
  users = USERS;

  ngOnInit() {
    this.users = this.users.filter(user => user.id !== this.selectedUserId);
  }

  @Input() selectedUserId: number = 0;
  @Output() userSelected = new EventEmitter<User>();

  onClickSelectUser(user: User) {
    this.userSelected.emit(user);
  }

  getInitialsAvavtar(name: string): string {
    if (!name) return '';

    const names = name.split(' ');
    const initials = names.map(n => n.charAt(0).toUpperCase()).join('');
    return initials;
  } 

}
