import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { ObjetoToken } from '../interfaces/objeto-token';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private urlUsuarios = 'http://localhost:8080/usuarios';
  private urlRegistro = 'http://localhost:8080/registrar';

  constructor(private httpClient: HttpClient) {}

  registrar(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.urlRegistro, usuario);
  }

  detalhar(id: number): Observable<Usuario> {
    const url = `${this.urlUsuarios}/${id}`;

    return this.httpClient.get<Usuario>(url);
  }

  listar(): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.urlUsuarios);
  }

  atualizar(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(this.urlUsuarios, usuario);
  }

  excluir(id: number): Observable<Usuario> {
    const url = `${this.urlUsuarios}/${id}`;

    return this.httpClient.delete<Usuario>(url);
  }
}
