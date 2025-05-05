import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormControl } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  searchControl = new FormControl('');

  constructor(public router: Router) {}

  ngOnInit() {
    // Observa as mudanças de rota
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Se estiver navegando para a home, limpa a busca
      if (event.url === '/' || event.url === '/home') {
        this.searchControl.reset();
      }
    });
  }

  get isHomePage(): boolean {
    return this.router.url === '/' || this.router.url === '/home';
  }
}
