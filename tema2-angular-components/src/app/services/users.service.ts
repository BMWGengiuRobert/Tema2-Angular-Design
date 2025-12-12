import { Injectable } from "@angular/core";
import { User, USERS } from "../models/users.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    users = USERS;
    private selectedUser: BehaviorSubject<User> = new BehaviorSubject<User>(this.users[0]);
    selectedUser$ = this.selectedUser.asObservable();

    setSelectedUser(user: User) {
        this.selectedUser.next(user);
    }

    getSelectedUser() {
        return this.selectedUser.getValue();
    }

    getUsers() {
        return this.users;
    }

    addUser(user: User) {
        this.users.push(user);
    }
}