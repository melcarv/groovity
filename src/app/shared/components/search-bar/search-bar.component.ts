import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @Input() control: FormControl = new FormControl('');
  @Input() placeholder = 'Buscar...';
  
  private subscription: Subscription | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('SearchBar: Initializing...');
    this.subscription = this.control.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter(query => query?.trim().length > 0)
      )
      .subscribe(query => {
        console.log('SearchBar: Query changed:', query);
        this.navigateToSearch(query);
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  navigateToSearch(query: string): void {
    if (query?.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: query }
      });
    }
  }
}
