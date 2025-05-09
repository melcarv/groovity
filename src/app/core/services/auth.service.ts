import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, tap, shareReplay, filter } from 'rxjs/operators';
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
  
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private tokenRequest$: Observable<string> | null = null;

  constructor(private http: HttpClient) {}

  /**
   * Obtém um token de acesso válido
   * Se o token atual ainda for válido, retorna ele
   * Caso contrário, solicita um novo token ao servidor
   * @returns Observable com o token de acesso
   */
  getToken(): Observable<string> {
    const now = Date.now();
    const isValid = this.accessToken && 
                   this.tokenTimestamp && 
                   now - this.tokenTimestamp < this.tokenDuration;

    if (isValid && this.accessToken) {
      return of(this.accessToken);
    }

    // Se já existe uma requisição em andamento, retorna ela
    if (this.tokenRequest$) {
      return this.tokenRequest$;
    }

    // Cria uma nova requisição de token
    this.tokenRequest$ = this.http.get<{ access_token: string }>(environment.spotifyTokenUrl)
      .pipe(
        map(res => res.access_token),
        tap(token => {
          this.accessToken = token;
          this.tokenTimestamp = Date.now();
          this.tokenSubject.next(token);
        }),
        shareReplay(1)
      );

    return this.tokenRequest$;
  }

  refreshToken(): Observable<string> {
    // Força uma nova requisição de token
    this.accessToken = null;
    this.tokenTimestamp = null;
    this.tokenRequest$ = null;
    return this.getToken();
  }

  getCurrentToken(): Observable<string> {
    return this.tokenSubject.asObservable().pipe(
      filter((token): token is string => token !== null)
    );
  }
}
