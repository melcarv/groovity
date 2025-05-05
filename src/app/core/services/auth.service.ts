import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

/**
 * Serviço responsável pelo gerenciamento de autenticação com a API do Spotify
 * Gerencia o token de acesso e sua validade
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  /** Token de acesso atual */
  private accessToken: string | null = null;
  /** Timestamp da última obtenção do token */
  private tokenTimestamp: number | null = null;
  /** Duração de validade do token em milissegundos (1 hora) */
  private readonly tokenDuration = 3600 * 1000; // 1h em ms

  constructor(private http: HttpClient) {}

  /**
   * Obtém um token de acesso válido
   * Se o token atual ainda for válido, retorna ele
   * Caso contrário, solicita um novo token ao servidor
   * @returns Observable com o token de acesso
   */
  getToken(): Observable<string> {
    const now = Date.now();
    // Verifica se o token atual ainda é válido
    const isValid = this.accessToken && this.tokenTimestamp && now - this.tokenTimestamp < this.tokenDuration;

    if (isValid) {
      return of(this.accessToken!);
    }

    // Solicita um novo token ao servidor
    return this.http.get<{ access_token: string }>(environment.spotifyTokenUrl).pipe(
      map(res => res.access_token),
      tap(token => {
        // Armazena o novo token e seu timestamp
        this.accessToken = token;
        this.tokenTimestamp = Date.now();
      })
    );
  }
}
