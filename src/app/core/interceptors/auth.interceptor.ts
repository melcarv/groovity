import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

/**
 * Interceptor responsável por adicionar o token de autenticação
 * nas requisições feitas para a API do Spotify
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  /**
   * Intercepta as requisições HTTP e adiciona o token de autenticação
   * @param req Requisição original
   * @param next Manipulador para continuar a cadeia de interceptores
   * @returns Observable com a resposta da requisição
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Verifica se a requisição é para a API do Spotify
    if (!req.url.startsWith(environment.spotifyApiBaseUrl)) {
      return next.handle(req);  // Passa a requisição adiante sem modificação
    }

    // Obtém o token e adiciona ao cabeçalho da requisição
    return this.authService.getToken().pipe(
      switchMap(token => {
        // Clona a requisição e adiciona o token no header
        const authReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next.handle(authReq);
      })
    );
  }
}
