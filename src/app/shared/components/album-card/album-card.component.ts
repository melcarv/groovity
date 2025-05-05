import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss']
})
export class AlbumCardComponent {
  @Input() album: any;

  constructor(private router: Router) {}

  navigateToAlbum(): void {
    if (this.album?.id) {
      this.router.navigate(['/album', this.album.id]);
    }
  }
}
