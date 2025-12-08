import { Component, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';
import { UsersDropdown } from '../../users-dropdown/users-dropdown';
import { CommonModule } from '@angular/common';
import { USERS, User } from '../../../models/users.model';
import { AvatarColorService } from '../../../services/avatar-color.service';

@Component({
  selector: 'app-avatar-picture',
  imports: [UsersDropdown, CommonModule],
  templateUrl: './avatar-picture.html',
  styleUrl: './avatar-picture.sass',
})
export class AvatarPicture {

  isDropdownVisible = false;
  selectedUser: User = USERS[0];

  constructor(private elementRef: ElementRef, private avatarColorService: AvatarColorService) { }

  onClickShowDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  onUserSelected(user: User) {
    this.selectedUser = user;
    this.isDropdownVisible = false;
    this.avatarColorService.setSelectedUserColor(user.color);
  }

  @HostListener('document:click', ['$event'])
  onClickOutsideDropdown(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);

    if (!clickedInside && this.isDropdownVisible) {
      this.isDropdownVisible = false;
    }
  }

  getInitialsAvatar(firstName: string, lastName: string): string {
    if (!firstName || !lastName) return '';
    const initials = firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
    return initials;
  }

}
