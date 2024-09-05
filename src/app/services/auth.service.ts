// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private apiUrl = 'https://base-api-divine-morning-3669.fly.dev/auth/login'; // Reemplaza con la URL real de tu API

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };

    return this.http.post<{ accessToken: string }>(this.apiUrl, body, { headers })
      .pipe(
        map(response => {
          this.token = response.accessToken;
          return this.token;
        })
      );
  }

  getToken(): string | null {
    return this.token;
  }

  logout(): void {
    this.token = null;
  }
}
