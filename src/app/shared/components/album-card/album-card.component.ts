import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Componente responsável por exibir um cartão com informações do álbum
 * Permite navegação para a página de detalhes do álbum
 */
@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss']
})
export class AlbumCardComponent {
  /** Dados do álbum a ser exibido no cartão */
  @Input() album: any;

  constructor(private router: Router) {}

  navigateToAlbum(): void {
    if (this.album?.id) {
      this.router.navigate(['/album', this.album.id]);
    }
  }
}
