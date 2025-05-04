import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/core/services/spotify.service';
import { forkJoin } from 'rxjs';
import { Location } from '@angular/common';

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
  limit = 12;
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
      this.loadArtistData();
    });
  }

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
        
        // Debug logging
        console.log('Artist data:', {
          name: this.artist.name,
          genres: this.artist.genres,
          hasGenres: Array.isArray(this.artist.genres),
          genresLength: this.artist.genres?.length
        });

        if (!this.artist.genres) {
          this.artist.genres = [];
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading artist data:', err);
        this.error = 'Erro ao carregar dados do artista';
        this.loading = false;
      }
    });
  }

  onPageChange(newOffset: number): void {
    this.offset = newOffset;
    this.fetchAlbums();
  }

  private fetchAlbums(): void {
    this.loading = true;
    this.spotifyService.getArtistAlbums(this.artistId, this.limit, this.offset).subscribe({
      next: res => {
        this.albums = res.items;
        this.total = res.total;
        this.loading = false;
      },
      error: err => {
        console.error('Error loading albums:', err);
        this.error = 'Erro ao carregar álbuns';
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  // Helper method to check if genres exist
  hasGenres(): boolean {
    return Array.isArray(this.artist?.genres) && this.artist.genres.length > 0;
  }
}