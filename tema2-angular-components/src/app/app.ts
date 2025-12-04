import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AvatarPicture } from './avatar-picture/avatar-picture';
import { Sidebar } from './sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  protected readonly title = signal('tema2-angular-components');
}
