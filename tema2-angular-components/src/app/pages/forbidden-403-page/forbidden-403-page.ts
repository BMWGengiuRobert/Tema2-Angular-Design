import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forbidden-403-page',
  imports: [],
  templateUrl: './forbidden-403-page.html',
  styleUrl: './forbidden-403-page.sass',
})
export class Forbidden403Page {

  constructor(private router: Router) {
    this.router = router;
  }

  goToHomePage(): void {
    this.router.navigate(['/home']);
  }
}
