import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/core/services/spotify.service';
import { forkJoin } from 'rxjs';
import { Location } from '@angular/common';

/**
 * Componente responsável por exibir os detalhes de um artista específico
 * Mostra informações do artista e sua lista de álbuns com paginação
 */
@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit {
  artistId!: string;
  artist: any;
  albums: any[] = [];
  offset = 0;
  limit = 15;
  total = 0;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.artistId = params['id'];
      this.offset = 0;
      this.loadArtistData();
    });
  }

  /**
   * Carrega os dados do artista e seus álbuns simultaneamente
   * usando forkJoin para combinar as requisições
   */
  private loadArtistData(): void {
    this.loading = true;
    this.error = null;

    forkJoin({
      artist: this.spotifyService.getArtist(this.artistId),
      albums: this.spotifyService.getArtistAlbums(this.artistId, this.limit, this.offset)
    }).subscribe({
      next: (data) => {
        this.artist = data.artist;
        this.albums = data.albums.items;
        this.total = data.albums.total;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar dados do artista';
        this.loading = false;
      }
    });
  }

  
//Atualiza o valor do offset (página atual) e busca apenas os álbuns de novo, sem repetir a requisição do artista.
  onPageChange(newOffset: number): void {
    this.offset = newOffset;
    this.fetchAlbums();
  }


//Faz uma nova chamada para pegar somente os álbuns quando a página mudar, reutilizando
  private fetchAlbums(): void {
    this.loading = true;
    this.spotifyService.getArtistAlbums(this.artistId, this.limit, this.offset).subscribe({
      next: res => {
        this.albums = res.items;
        this.total = res.total;
        this.loading = false;
      },
      error: err => {
        this.error = 'Erro ao carregar álbuns';
        this.loading = false;
      }
    });
  }

//Verifica se o artista possui gêneros musicais cadastrados
  hasGenres(): boolean {
    return Array.isArray(this.artist?.genres) && this.artist.genres.length > 0;
  }
}