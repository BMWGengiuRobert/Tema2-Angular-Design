import { inject, Injectable } from "@angular/core";
import { LoginData } from "../models/formData.model";
import { UsersService } from "./users.service";
import { User } from "../models/users.model";

@Injectable({
    providedIn: 'root',
})
export class CheckPermissionService {

    // Injecting services
    userService: UsersService = inject(UsersService);

    checkPermission(): boolean {
        return false;
    }

    checkValidCredentials(loginData: LoginData): User | null {

        const allUsers: User[] = this.userService.getUsers();
        const userFound: User | undefined = allUsers.find(user => user.username === loginData.username && user.password === loginData.password);

        return userFound || null;
    }
}