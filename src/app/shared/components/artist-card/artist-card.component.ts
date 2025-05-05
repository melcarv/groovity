import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Componente responsável por exibir um cartão com informações do artista
 * Permite navegação para a página de detalhes do artista
 */
@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.scss']
})
export class ArtistCardComponent {
  /** Dados do artista a ser exibido no cartão */
  @Input() artist: any;

  constructor(private router: Router) {}

  /**
   * Navega para a página de detalhes do artista
   * Utiliza o ID do artista para construir a URL
   */
  navigateToArtist(): void {
    if (this.artist?.id) {
      this.router.navigate(['/artist', this.artist.id]);
    }
  }
}
