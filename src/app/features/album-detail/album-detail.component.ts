import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/core/services/spotify.service';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';

/**
 * Componente responsável por exibir os detalhes de um álbum específico
 * Mostra informações do álbum, artista e lista de faixas
 */
@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit {
  albumId!: string;
  album: any;
  artist: any;
  loading = true;
  error: string | null = null;

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

  
  //Carrega os dados do álbum pelo albumID e em seguida os dados do artista principal usando switchMap para encadear as requisições
  private fetchAlbumAndArtist(): void {
    this.loading = true;
    this.error = null;

    this.spotifyService.getAlbum(this.albumId)
      .pipe(
        switchMap(album => {
          this.album = album;
          const artistId = album.artists[0].id;
          return this.spotifyService.getArtist(artistId);
        })
      )
      .subscribe({
        next: (artist) => {
          this.artist = artist;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Erro ao carregar dados do álbum';
          this.loading = false;
        }
      });
  }

  //Converte a duração de uma faixa de milissegundos para o formato seg:min
  formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  //Soma o tempo de todas as faixas para e retorna o tempo total do album
  getTotalDuration(): string {
    if (!this.album?.tracks?.items) return '0:00';
    
    const totalMs = this.album.tracks.items.reduce((acc: number, track: any) => {
      return acc + track.duration_ms;
    }, 0);

    const minutes = Math.floor(totalMs / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000);
    
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours} h ${remainingMinutes} min`;
    }
    
    return `${minutes} min ${seconds} s`;
  }

  // Concatena os nomes dos artistas em uma única string, separados por vírgula (por exemplo: artistas que colaboraram com uma faixa)
  getArtists(artists: any[]): string {
    return artists.map(artist => artist.name).join(', ');
  }

  //Retorna para página anterior
  goBack(): void {
    this.location.back();
  }
}
