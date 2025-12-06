import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ROUTES } from '../../../models/routes.model';
import { RouterLink } from '@angular/router';
import { AvatarColorService } from '../../../services/avatar-color.service';

@Component({
  selector: 'app-routes-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './routes-list.html',
  styleUrl: './routes-list.sass',
})
export class RoutesList implements OnInit {

  routes = ROUTES;
  selectedUserColor: string = '';
  hoveredRouteId: number | null = null;

  constructor(private userService: AvatarColorService) {}

  ngOnInit() {
    this.userService.selectedUserColor$.subscribe(color => {
      this.selectedUserColor = color;
    });
  }

}
  