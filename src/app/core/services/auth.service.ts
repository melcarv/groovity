import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private accessToken: string | null = null;
  private tokenTimestamp: number | null = null;
  private readonly tokenDuration = 3600 * 1000; // 1 hora em ms

  constructor(private http: HttpClient) {}

  getToken(): Observable<string> {
    // Verifica se já tem token válido em cache
    if (this.accessToken && this.tokenTimestamp && Date.now() - this.tokenTimestamp < this.tokenDuration) {
      return of(this.accessToken);
    }

    // Busca novo token do backend
    return this.http.get<{ access_token: string }>(environment.spotifyTokenUrl).pipe(
      map(res => res.access_token),
      tap(token => {
        this.accessToken = token;
        this.tokenTimestamp = Date.now();
      })
    );
  }

//  (opcional) método para acessar o token diretamente
//   getAccessToken(): string | null {
//     return this.accessToken;
//   }
}
