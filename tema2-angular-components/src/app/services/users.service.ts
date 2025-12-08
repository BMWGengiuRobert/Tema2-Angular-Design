import { Injectable } from "@angular/core";
import { User, USERS } from "../models/users.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    users = USERS;

    getUsers() {
        return this.users;
    }

    addUser(user: User) {
        this.users.push(user);
    }
}