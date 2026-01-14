import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { OpenModalService } from '../../../services/modal.service';
import { CommonModule } from '@angular/common';
import { ChangeThemeService } from '../../../services/change-theme.service';

@Component({
  selector: 'app-change-theme-modal',
  imports: [CommonModule],
  templateUrl: './change-theme-modal.html',
  styleUrl: './change-theme-modal.sass',
})
export class ChangeThemeModal implements OnInit, OnDestroy {
  isModalOpen: boolean = false;
  modalSubscription: Subscription = new Subscription();
  themeSubscription: Subscription = new Subscription();
  currentTheme: 'light' | 'dark' = 'light';

  constructor(private modalService: OpenModalService, private changeThemeService: ChangeThemeService) { }

  ngOnInit() {
    this.modalSubscription = this.modalService.isChangeThemeModalOpen$.subscribe({
      next: (isOpen: boolean) => {
        this.isModalOpen = isOpen;
      },
      error: (err) => {
        console.error('Error receiving modal state:', err);
      },
      complete: () => {
        console.log('Completed receiving modal state.');
      }
    });

    this.themeSubscription = this.changeThemeService.currentTheme$.subscribe({
      next: (theme) => {
        this.currentTheme = theme;
      },
      error: (err) => {
        console.error('Error receiving theme:', err);
      },
      complete: () => {
        console.log('Completed receiving theme.');
      }
    });
  }

  closeModal() {
    this.modalService.closeChangeThemeModal();
  }

  clickedOutsideModal(event: MouseEvent) {
    this.modalService.clickedOutsideChangeThemeModal(event);
  }

  setTheme(theme: 'light' | 'dark') {
    this.changeThemeService.setTheme(theme);
  }

  isActiveTheme(theme: 'light' | 'dark'): boolean {
    return this.currentTheme === theme;
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
    this.themeSubscription.unsubscribe();
  }

}
