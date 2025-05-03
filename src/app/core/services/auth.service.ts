import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private accessToken: string | null = null;
  private tokenTimestamp: number | null = null;
  private readonly tokenDuration = 3600 * 1000; // 1h em ms

  constructor(private http: HttpClient) {}

  getToken(): Observable<string> {
    const now = Date.now();
    const isValid = this.accessToken && this.tokenTimestamp && now - this.tokenTimestamp < this.tokenDuration;

    if (isValid) {
      return of(this.accessToken!);
    }

    return this.http.get<{ access_token: string }>(environment.spotifyTokenUrl).pipe(
      map(res => res.access_token),
      tap(token => {
        this.accessToken = token;
        this.tokenTimestamp = Date.now();
      })
    );
  }
}
