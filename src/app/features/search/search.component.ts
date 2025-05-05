import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from 'src/app/core/services/spotify.service';

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

  ngOnInit(): void {
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

  fetchArtists(): void {
    if (!this.query.trim()) {
      this.artists = [];
      this.total = 0;
      return;
    }

    this.loading = true;
    this.error = null;
    
    this.spotifyService.searchArtists(this.query.trim(), this.limit, this.offset).subscribe({
      next: (res) => {
        if (res?.artists?.items) {
          // Filtra artistas sem imagens
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
