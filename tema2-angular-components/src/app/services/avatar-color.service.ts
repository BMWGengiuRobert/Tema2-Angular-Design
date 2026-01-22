import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { USERS } from '../models/users.model';

@Injectable({
  providedIn: 'root',
})
export class AvatarColorService {
  private selectedUserColor = new BehaviorSubject<string>(USERS[0].color);

  selectedUserColor$ = this.selectedUserColor.asObservable();

  setSelectedUserColor(color: string) {
    this.selectedUserColor.next(color);
  }
}
