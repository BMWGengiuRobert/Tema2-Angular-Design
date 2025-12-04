import { Component, HostListener, ElementRef } from '@angular/core';
import { UsersDropdown } from '../users-dropdown/users-dropdown';
import { CommonModule } from '@angular/common';
import { USERS, User } from '../../../models/users.model';

@Component({
  selector: 'app-avatar-picture',
  imports: [UsersDropdown, CommonModule],
  templateUrl: './avatar-picture.html',
  styleUrl: './avatar-picture.sass',
})
export class AvatarPicture {

  isDropdownVisible = false;
  selectedUser: User = USERS[0];

  constructor(private elementRef: ElementRef) {}

  onClickShowDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  onUserSelected(user: User) {
    this.selectedUser = user;
    this.isDropdownVisible = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutsideDropdown(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);

    if (!clickedInside && this.isDropdownVisible) {
      this.isDropdownVisible = false;
    }
  }

}
