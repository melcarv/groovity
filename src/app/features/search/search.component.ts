import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from 'src/app/core/services/spotify.service';

/**
 * Componente responsável pela funcionalidade de busca de artistas
 * Gerencia a pesquisa, paginação e exibição dos resultados
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  artists: any[] = [];
  query: string = '';
  offset = 0;
  limit = 12;
  total = 0;
  loading = false;
  error: string | null = null;

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
    //Quando o componente é carregado, ele escuta a URL. Se o parâmetro q (query) ou offset mudar, ele dispara uma nova busca.
    this.route.queryParams.subscribe(params => {
      const newQuery = params['q']?.trim() || '';
      const newOffset = +params['offset'] || 0;

      // Só atualiza se a query for diferente ou se mudou o offset
      if (newQuery !== this.query || this.offset !== newOffset) {
        this.query = newQuery;
        this.offset = newOffset;
        if (this.query) {
          this.fetchArtists();
        } else {
          this.artists = [];
          this.total = 0;
        }
      }
    });
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
    
    //Chama o método do SpotifyService para buscar artistas usando a query da URL.
    this.spotifyService.searchArtists(this.query.trim(), this.limit, this.offset).subscribe({
      next: (res) => {
        if (res?.artists?.items) {
          this.artists = res.artists.items.filter((artist: any) => artist.images?.length > 0);
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
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  //Esse método é chamado pelo componente de paginação quando o usuário muda de página.
  onPageChange(newOffset: number): void {
    this.router.navigate([], {
      queryParams: {
        q: this.query,
        offset: newOffset
      },
      queryParamsHandling: 'merge'
    });
  }
}
