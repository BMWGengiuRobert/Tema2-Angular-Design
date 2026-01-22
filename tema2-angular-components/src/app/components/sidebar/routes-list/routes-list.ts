import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ROUTES } from '../../../models/routes.model';
import { RouterLink } from '@angular/router';
import { AvatarColorService } from '../../../services/avatar-color.service';
import { Subscription } from 'rxjs';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-routes-list',
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './routes-list.html',
  styleUrl: './routes-list.sass',
})
export class RoutesList implements OnInit, OnDestroy {

  routes = ROUTES;
  selectedUserColor: string = '';
  hoveredRouteId: number | null = null;

  private colorSubscription: Subscription = new Subscription();

  constructor(private userService: AvatarColorService, private translateService: TranslateService) {}

  ngOnInit() {
    this.colorSubscription = this.userService.selectedUserColor$.subscribe({
      next: (color: string) => {
        this.selectedUserColor = color;
      },
      error: (err) => {
        console.error('Error fetching user color:', err);
      },
      complete: () => {
        console.log('Completed fetching user color.');
      }
    });

    this.translateService.use(document.documentElement.lang || 'en');
  }

  ngOnDestroy() {
    this.colorSubscription.unsubscribe();
  }

}
  