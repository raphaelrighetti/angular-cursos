import { ObjetoToken } from '../interfaces/objeto-token';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  urlLogin = 'http://localhost:8080/login';

  constructor(private http: HttpClient) {}

  logar(usuario: Usuario): Observable<ObjetoToken> {
    return this.http.post<ObjetoToken>(this.urlLogin, usuario);
  }

  logado() {
    return (
      !!localStorage.getItem('usuarioId') &&
      !!localStorage.getItem('username') &&
      !!localStorage.getItem('token') &&
      !!localStorage.getItem('refreshToken')
    );
  }

  refreshToken(): Observable<ObjetoToken> {
    const url = `${this.urlLogin}/refresh`;

    const refreshTokenObj = {
      refreshToken: localStorage.getItem('refreshToken'),
    };

    console.log('jesus cristo');

    return this.http.post<ObjetoToken>(url, refreshTokenObj);
  }

  saveTokens(obj: ObjetoToken) {
    localStorage.clear();

    localStorage.setItem('usuarioId', String(obj.usuarioId));
    localStorage.setItem('username', obj.username);
    localStorage.setItem('token', obj.token);
    localStorage.setItem('refreshToken', obj.refreshToken);
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }

  getObjetoToken() {
    const usuarioId = parseInt(localStorage.getItem('usuarioId') as string);

    const objetoToken: ObjetoToken = {
      usuarioId,
      username: localStorage.getItem('username') as string,
      token: localStorage.getItem('token') as string,
      refreshToken: localStorage.getItem('refreshToken') as string,
    };

    return objetoToken;
  }
}
