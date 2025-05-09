import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/core/services/spotify.service';
import { Location } from '@angular/common';
import { switchMap, takeUntil, catchError, finalize } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Album, Artist, Track } from 'src/app/core/models/spotify.models';

/**
 * Componente responsável por exibir os detalhes de um álbum específico
 * Mostra informações do álbum, artista e lista de faixas
 */
@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit, OnDestroy {
  albumId!: string;
  album: Album | null = null;
  artist: Artist | null = null;
  loading = true;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.albumId = params['id'];
      this.fetchAlbumAndArtist();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Carrega os dados do álbum pelo albumID e em seguida os dados do artista principal
   * usando switchMap para encadear as requisições
   */
  private fetchAlbumAndArtist(): void {
    this.loading = true;
    this.error = null;

    this.spotifyService.getAlbum(this.albumId)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(album => {
          this.album = album;
          const artistId = album.artists[0].id;
          return this.spotifyService.getArtist(artistId);
        }),
        catchError(error => {
          this.error = 'Erro ao carregar dados do álbum';
          throw error;
        }),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (artist) => {
          this.artist = artist;
        }
      });
  }

  /**
   * Navega de volta para a página anterior
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * Formata a duração de uma faixa em minutos e segundos
   * @param durationMs Duração em milissegundos
   * @returns String formatada (ex: "3:45")
   */
  formatDuration(durationMs: number): string {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  /**
   * Retorna a duração total do álbum formatada
   * @returns String com a duração total formatada
   */
  getTotalDuration(): string {
    if (!this.album?.tracks?.items) return '0:00';
    
    const totalMs = this.album.tracks.items.reduce(
      (total: number, track: Track) => total + track.duration_ms,
      0
    );
    return this.formatDuration(totalMs);
  }

  /**
   * Retorna os nomes dos artistas de uma faixa separados por vírgula
   * @param artists Array de artistas da faixa
   * @returns String com os nomes dos artistas
   */
  getArtists(artists: Artist[]): string {
    return artists.map(artist => artist.name).join(', ');
  }
}
