import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from 'src/app/core/services/spotify.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Artist } from 'src/app/core/models/spotify.models';

/**
 * Componente responsável pela funcionalidade de busca de artistas
 * Gerencia a pesquisa, paginação e exibição dos resultados
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  artists: Artist[] = [];
  query: string = '';
  offset = 0;
  limit = 12;
  total = 0;
  loading = false;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spotifyService: SpotifyService
  ) {}

  /**
   * Inicializa o componente e configura a observação dos parâmetros da URL
   * Atualiza a busca quando os parâmetros mudam
   */
  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.query = params['q'] || '';
        this.offset = parseInt(params['offset'] || '0', 10);
        this.fetchArtists();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Realiza a busca de artistas usando o SpotifyService
   * Atualiza o estado do componente com os resultados ou erros
   */
  fetchArtists(): void {
    if (!this.query.trim()) {
      this.artists = [];
      this.total = 0;
      return;
    }

    this.loading = true;
    this.error = null;
    
    this.spotifyService.searchArtists(this.query.trim(), this.limit, this.offset)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res?.artists?.items) {
            this.artists = res.artists.items.filter(artist => artist.images?.length > 0);
            this.total = res.artists.total;
          } else {
            this.error = 'Formato de resposta inválido';
            this.artists = [];
            this.total = 0;
          }
        },
        error: (err) => {
          this.error = 'Erro ao buscar artistas';
          this.artists = [];
          this.total = 0;
        },
        complete: () => {
          this.loading = false;
        }
      });
  }

  /**
   * Atualiza a URL com os novos parâmetros de busca
   * @param newOffset Novo offset para paginação
   */
  onPageChange(newOffset: number): void {
    this.offset = newOffset;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        q: this.query,
        offset: this.offset
      },
      queryParamsHandling: 'merge'
    });
  }
}
