import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { OpenModalService } from '../../services/modal.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { BehaviorSubject } from 'rxjs';
import { AvatarColorService } from '../../services/avatar-color.service';

@Component({
  selector: 'app-loading-spinner',
  imports: [CommonModule],
  templateUrl: './loading-spinner.html',
  styleUrl: './loading-spinner.sass',
})
export class LoadingSpinner implements OnInit, OnDestroy {

  isModalOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loadingSpinnerSubscription: Subscription = new Subscription();
  selectedUserSubscription: Subscription = new Subscription();
  selectedUserColor: string = '';


  constructor(private modalService: OpenModalService, private avatarColorService: AvatarColorService) { }

  ngOnInit() {
    this.loadingSpinnerSubscription = this.modalService.isLoadingSpinnerOpen$.subscribe({
      next: (isOpen: boolean) => {
        this.isModalOpen.next(isOpen);
      },
      error: (err) => {
        console.error('Error in Loading Spinner subscription:', err);
      },
      complete: () => {
        this.isModalOpen.next(false);
      }
    });

    this.selectedUserSubscription = this.avatarColorService.selectedUserColor$.subscribe({
      next: (color: string) => {
        this.selectedUserColor = color;
      },
      error: (err) => {
        console.error('Error fetching selected user color:', err);
      },
      complete: () => {
        console.log('Completed fetching selected user color.');
      }
    });

  }


  ngOnDestroy() {
    this.loadingSpinnerSubscription.unsubscribe();
    this.selectedUserSubscription.unsubscribe();
  }

}
