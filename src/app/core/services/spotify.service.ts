import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SpotifyService {
  private baseUrl = environment.spotifyApiBaseUrl;

  constructor(private http: HttpClient) {}

  searchArtists(query: string, limit = 10, offset = 0): Observable<any> {
    const searchQuery = `artist:"${query}"`;
    
    const params = new HttpParams()
      .set('q', searchQuery)
      .set('type', 'artist')
      .set('limit', limit)
      .set('offset', offset)
      .set('market', 'BR');

    return this.http.get(`${this.baseUrl}/search`, { params });
  }

  getArtist(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/artists/${id}`);
  }

  getArtistAlbums(id: string, limit = 10, offset = 0): Observable<any> {
    const params = new HttpParams()
      .set('limit', limit)
      .set('offset', offset)
      .set('market', 'BR')
      .set('include_groups', 'album,single')
      .set('album_type', 'album,single');

    return this.http.get(`${this.baseUrl}/artists/${id}/albums`, { params });
  }

  getAlbum(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/albums/${id}`);
  }
}
