import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/core/services/spotify.service';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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

  formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

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

  getArtists(artists: any[]): string {
    return artists.map(artist => artist.name).join(', ');
  }

  goBack(): void {
    this.location.back();
  }
}
