import { Pensamento } from '../interfaces/pensamento';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pageable } from '../interfaces/pageable';

@Injectable({
  providedIn: 'root',
})
export class PensamentoService {
  private readonly urlAPI = 'http://localhost:8080/pensamentos';

  constructor(private http: HttpClient) {}

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.urlAPI, pensamento);
  }

  listar(
    pagina: number,
    filtro: string,
    favoritos: boolean
  ): Observable<Pageable> {
    let url = this.urlAPI;

    const itensPorPagina = 6;

    let params = new HttpParams()
      .set('page', pagina)
      .set('size', itensPorPagina);

    if (filtro.trim().length > 2) {
      params = params.set('filtro', filtro);
    }

    if (favoritos) {
      url += '/favoritos';
    }

    return this.http.get<Pageable>(url, { params });
  }

  editar(pensamento: Pensamento): Observable<Pensamento> {
    const url = `${this.urlAPI}/${pensamento.id}`;

    return this.http.put<Pensamento>(url, pensamento);
  }

  mudarFavorito(pensamento: Pensamento): Observable<Pensamento> {
    pensamento.favorito = !pensamento.favorito;

    return this.editar(pensamento);
  }

  excluir(id: number): Observable<Pensamento> {
    const url = `${this.urlAPI}/${id}`;

    return this.http.delete<Pensamento>(url);
  }

  buscarPorId(id: number): Observable<Pensamento> {
    const url = `${this.urlAPI}/${id}`;

    return this.http.get<Pensamento>(url);
  }
}