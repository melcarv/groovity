import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Artist, Album, SearchResponse, PagedResponse } from '../models/spotify.models';

/**
 * Serviço responsável por realizar as requisições à API do Spotify
 * Fornece métodos para busca de artistas, álbuns e detalhes
 */
@Injectable({ providedIn: 'root' })
export class SpotifyService {
  private baseUrl = environment.spotifyApiBaseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Realiza busca de artistas no Spotify
   * @param query Termo de busca
   * @param limit Quantidade de resultados por página
   * @param offset Índice inicial para paginação
   * @returns Observable com os resultados da busca
   */
  searchArtists(query: string, limit = 10, offset = 0): Observable<SearchResponse> {
    const searchQuery = `artist:"${query}"`;
    
    const params = new HttpParams()
      .set('q', searchQuery)
      .set('type', 'artist')
      .set('limit', limit)
      .set('offset', offset)
      .set('market', 'BR');

    return this.http.get<SearchResponse>(`${this.baseUrl}/search`, { params });
  }

  /**
   * Obtém detalhes de um artista específico
   * @param id ID do artista no Spotify
   * @returns Observable com os detalhes do artista
   */
  getArtist(id: string): Observable<Artist> {
    return this.http.get<Artist>(`${this.baseUrl}/artists/${id}`);
  }

  /**
   * Obtém os álbuns de um artista específico
   * @param id ID do artista no Spotify
   * @param limit Quantidade de álbuns por página
   * @param offset Índice inicial para paginação
   * @returns Observable com a lista de álbuns do artista
   */
  getArtistAlbums(id: string, limit = 10, offset = 0): Observable<PagedResponse<Album>> {
    const params = new HttpParams()
      .set('limit', limit)
      .set('offset', offset)
      .set('market', 'BR')
      .set('include_groups', 'album,single')  // Inclui álbuns e singles
      .set('album_type', 'album,single');  // Filtra por tipos específicos

    return this.http.get<PagedResponse<Album>>(`${this.baseUrl}/artists/${id}/albums`, { params });
  }

  /**
   * Obtém detalhes de um álbum específico
   * @param id ID do álbum no Spotify
   * @returns Observable com os detalhes do álbum
   */
  getAlbum(id: string): Observable<Album> {
    return this.http.get<Album>(`${this.baseUrl}/albums/${id}`);
  }
}
