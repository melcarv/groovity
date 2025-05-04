import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.scss']
})
export class ArtistCardComponent {
  @Input() artist: any;

  constructor(private router: Router) {}

  navigateToArtist(): void {
    if (this.artist?.id) {
      this.router.navigate(['/artist', this.artist.id]);
    }
  }
}
