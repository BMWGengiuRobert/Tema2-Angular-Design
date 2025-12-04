import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar-component/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  protected readonly title = signal('tema2-angular-components');
}
