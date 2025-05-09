import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SpotifyService } from 'src/app/core/services/spotify.service';
import { Router } from '@angular/router';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { Artist } from 'src/app/core/models/spotify.models';

/**
 * Componente da página inicial
 * Responsável por exibir um artista em destaque aleatório e o campo de busca
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  highlightArtist: Artist | null = null;
  loading = true;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private spotifyService: SpotifyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFeaturedArtist();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Carrega um artista aleatório de uma lista predefinida de artistas populares
   * para exibir em destaque na página inicial.
   */
  private loadFeaturedArtist(): void {
    this.loading = true;
    this.error = null;

    // Lista com nomes de artistas populares. Um deles será selecionado aleatoriamente para aparecer na home.
    const popularArtists = [
      'Taylor Swift', 'Ariana Grande', 'Lady Gaga',
      'Rihanna', 'Justin Bieber', 'Beyoncé', 
      'Garbage', 'Placebo',
      'Depeche Mode', 'Madonna'
    ];

    // Seleciona um artista aleatório da lista
    const randomArtist = popularArtists[Math.floor(Math.random() * popularArtists.length)];

    // Busca os detalhes do artista selecionado
    this.spotifyService.searchArtists(randomArtist, 1, 0).pipe(
      takeUntil(this.destroy$),
      catchError(err => {
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
