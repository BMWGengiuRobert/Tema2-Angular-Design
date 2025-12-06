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

  getInitialsAvatar(name: string): string {
    if (!name) return '';
    const names = name.split(' ');
    const initials = names.map(n => n.charAt(0).toUpperCase()).join('');
    return initials;
  }

}
