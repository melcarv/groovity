import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/core/services/spotify.service';
import { forkJoin, Subject, Observable } from 'rxjs';
import { Location } from '@angular/common';
import { takeUntil, shareReplay, catchError, finalize } from 'rxjs/operators';
import { Artist, Album } from 'src/app/core/models/spotify.models';

/**
 * Componente responsável por exibir os detalhes de um artista específico
 * Mostra informações do artista e sua lista de álbuns com paginação
 */
@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit, OnDestroy {
  artistId!: string;
  artist: Artist | null = null;
  albums: Album[] = [];
  offset = 0;
  limit = 15;
  total = 0;
  loading = true;
  error: string | null = null;
  
  private destroy$ = new Subject<void>();
  private artistData$!: Observable<Artist>;
  private albumsData$!: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.artistId = this.route.snapshot.paramMap.get('id') || '';
    if (this.artistId) {
      this.loadArtistData();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Carrega os dados do artista e seus álbuns simultaneamente
   * usando forkJoin para combinar as requisições
   */
  private loadArtistData(): void {
    this.loading = true;
    this.error = null;

    // Cache das requisições usando shareReplay
    this.artistData$ = this.spotifyService.getArtist(this.artistId).pipe(
      shareReplay(1)
    );

    this.albumsData$ = this.spotifyService.getArtistAlbums(
      this.artistId,
      this.limit,
      this.offset
    ).pipe(
      shareReplay(1)
    );

    forkJoin({
      artist: this.artistData$,
      albums: this.albumsData$
    })
    .pipe(
      takeUntil(this.destroy$),
      catchError(error => {
        this.error = 'Erro ao carregar dados do artista';
        console.error('Erro:', error);
        throw error;
      }),
      finalize(() => this.loading = false)
    )
    .subscribe({
      next: (data) => {
        this.artist = data.artist;
        this.albums = data.albums.items;
        this.total = data.albums.total;
      }
    });
  }

  /**
   * Atualiza a lista de álbuns quando a página é alterada
   * @param newOffset Novo offset para paginação
   */
  onPageChange(newOffset: number): void {
    this.offset = newOffset;
    this.fetchAlbums();
  }

  /**
   * Faz uma nova chamada para pegar somente os álbuns quando a página mudar
   */
  private fetchAlbums(): void {
    this.loading = true;
    
    this.albumsData$ = this.spotifyService.getArtistAlbums(
      this.artistId,
      this.limit,
      this.offset
    ).pipe(
      shareReplay(1),
      takeUntil(this.destroy$),
      catchError(error => {
        this.error = 'Erro ao carregar álbuns';
        console.error('Erro:', error);
        throw error;
      }),
      finalize(() => this.loading = false)
    );

    this.albumsData$.subscribe({
      next: res => {
        this.albums = res.items;
        this.total = res.total;
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
   * Verifica se o artista possui gêneros musicais
   * @returns true se o artista tiver gêneros, false caso contrário
   */
  hasGenres(): boolean {
    return Boolean(this.artist?.genres?.length);
  }
}