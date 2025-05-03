import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SpotifyService } from 'src/app/core/services/spotify.service';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchControl = new FormControl('');
  highlightArtist: any = null;

  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit(): void {
    this.spotifyService.searchArtists('a', 50, 0).subscribe(res => {
      const list = res.artists.items.filter((a: { images: string | any[]; }) => a.images?.length);
      this.highlightArtist = list[Math.floor(Math.random() * list.length)];
    });

    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(query => {
      if (query) {
        this.router.navigate(['/search'], { queryParams: { q: query, offset: 0 } });
      }
    });
  }
}
