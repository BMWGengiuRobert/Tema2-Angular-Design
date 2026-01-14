import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class OpenModalService {
    private isInvitePeopleModalOpen = new BehaviorSubject<boolean>(false);
    private isCreateProjectModalOpen = new BehaviorSubject<boolean>(false);
    private isChangeThemeModalOpen = new BehaviorSubject<boolean>(false);

    isInvitePeopleModalOpen$ = this.isInvitePeopleModalOpen.asObservable();
    isCreateProjectModalOpen$ = this.isCreateProjectModalOpen.asObservable();
    isChangeThemeModalOpen$ = this.isChangeThemeModalOpen.asObservable();

    openInvitePeopleModal() {
        this.isInvitePeopleModalOpen.next(true);
    }

    closeInvitePeopleModal() {
        this.isInvitePeopleModalOpen.next(false);
    }

    openCreateProjectModal() {
        this.isCreateProjectModalOpen.next(true);
    }

    closeCreateProjectModal() {
        this.isCreateProjectModalOpen.next(false);
    }

    openChangeThemeModal() {
        this.isChangeThemeModalOpen.next(true);
    }

    closeChangeThemeModal() {
        this.isChangeThemeModalOpen.next(false);
    }

    clickedOutsideInvitePeopleModal(event: MouseEvent) {
        if (event.target === event.currentTarget) {
            this.closeInvitePeopleModal();
        }
    }

    clickedOutsideCreateProjectModal(event: MouseEvent) {
        if (event.target === event.currentTarget) {
            this.closeCreateProjectModal();
        }
    }

    clickedOutsideChangeThemeModal(event: MouseEvent) {
        if (event.target === event.currentTarget) {
            this.closeChangeThemeModal();
        }
    }
}
