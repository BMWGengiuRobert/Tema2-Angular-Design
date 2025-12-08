import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ROUTES } from '../../../models/routes.model';
import { RouterLink } from '@angular/router';
import { AvatarColorService } from '../../../services/avatar-color.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-routes-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './routes-list.html',
  styleUrl: './routes-list.sass',
})
export class RoutesList implements OnInit, OnDestroy {

  routes = ROUTES;
  selectedUserColor: string = '';
  hoveredRouteId: number | null = null;

  private colorSubscription: Subscription = new Subscription();

  constructor(private userService: AvatarColorService) {}

  ngOnInit() {
    this.colorSubscription = this.userService.selectedUserColor$.subscribe(color => {
      this.selectedUserColor = color;
    });
  }

  ngOnDestroy() {
    this.colorSubscription.unsubscribe();
  }

}
  