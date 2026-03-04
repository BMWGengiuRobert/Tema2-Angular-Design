import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { OpenModalService } from '../../../services/modal.service';
import { CommonModule } from '@angular/common';
import { ChangeThemeService } from '../../../services/change-theme.service';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-theme-modal',
  imports: [CommonModule, TranslateModule, TranslatePipe],
  templateUrl: './change-theme-modal.html',
  styleUrl: './change-theme-modal.sass',
})
export class ChangeThemeModal implements OnInit, OnDestroy {
  isModalOpen: boolean = false;
  modalSubscription: Subscription = new Subscription();
  themeSubscription: Subscription = new Subscription();
  currentTheme: 'light' | 'dark' = 'light';

  // Injecting services
  modalService: OpenModalService = inject(OpenModalService);
  changeThemeService: ChangeThemeService = inject(ChangeThemeService);
  translateService: TranslateService = inject(TranslateService);

  ngOnInit() {
    this.checkChangeThemeModalOpen();
    this.getCurrentTheme();
    this.translateService.use(document.documentElement.lang || 'en');
  }

  checkChangeThemeModalOpen() {
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
  }

  getCurrentTheme() {
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
