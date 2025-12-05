import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ROUTES } from '../../../models/routes.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-routes-list',
  imports: [CommonModule,RouterLink],
  templateUrl: './routes-list.html',
  styleUrl: './routes-list.sass',
})
export class RoutesList {

  routes = ROUTES;
}
