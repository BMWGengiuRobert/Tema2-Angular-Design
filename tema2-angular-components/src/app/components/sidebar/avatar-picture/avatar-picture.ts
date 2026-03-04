import { Component, HostListener, ElementRef, inject } from '@angular/core';
import { UsersDropdown } from '../../users-dropdown/users-dropdown';
import { CommonModule } from '@angular/common';
import { USERS, User } from '../../../models/users.model';
import { AvatarColorService } from '../../../services/avatar-color.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-avatar-picture',
  imports: [UsersDropdown, CommonModule],
  templateUrl: './avatar-picture.html',
  styleUrl: './avatar-picture.sass',
})
export class AvatarPicture {

  isDropdownVisible = false;
  selectedUser: User = USERS[0];

  // Injecting services
  avatarColorService: AvatarColorService = inject(AvatarColorService);
  usersService: UsersService = inject(UsersService);
  elementRef: ElementRef = inject(ElementRef);

  onClickShowDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  onUserSelected(user: User) {
    this.selectedUser = user;
    this.isDropdownVisible = false;
    this.avatarColorService.setSelectedUserColor(user.color);
    this.usersService.setSelectedUser(user);
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
