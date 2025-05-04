import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SpotifyService } from 'src/app/core/services/spotify.service';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  highlightArtist: any = null;
  loading = true;
  error: string | null = null;

  constructor(
    private spotifyService: SpotifyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFeaturedArtist();
  }

  ngOnDestroy(): void {
    // Limpa o form control ao sair
    this.searchControl.reset();
  }

  private loadFeaturedArtist(): void {
    this.loading = true;
    this.error = null;

    // Lista de artistas populares para buscar aleatoriamente
    const popularArtists = [
      'Drake', 'Taylor Swift', 'Ed Sheeran', 'The Weeknd', 
      'Ariana Grande', 'Post Malone', 'Eminem', 'Lady Gaga',
      'Rihanna', 'Justin Bieber', 'Beyoncé', 'Bruno Mars'
    ];

    const randomArtist = popularArtists[Math.floor(Math.random() * popularArtists.length)];

    this.spotifyService.searchArtists(randomArtist, 1, 0).pipe(
      catchError(err => {
        console.error('Error loading featured artist:', err);
        this.error = 'Erro ao carregar artista em destaque';
        return of({ artists: { items: [] } });
      }),
      finalize(() => this.loading = false)
    ).subscribe(res => {
      if (res.artists.items.length > 0) {
        this.highlightArtist = res.artists.items[0];
      }
    });
  }
}
