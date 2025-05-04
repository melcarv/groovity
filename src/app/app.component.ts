import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchControl = new FormControl('');

  constructor(public router: Router) {}

  get isHomePage(): boolean {
    return this.router.url === '/' || this.router.url === '/home';
  }
}
