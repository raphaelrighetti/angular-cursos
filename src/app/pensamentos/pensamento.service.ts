import { Pensamento } from './pensamento';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PensamentoService {
  private readonly urlAPI = 'http://localhost:3000/pensamentos';

  constructor(private http: HttpClient) {}

  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.urlAPI, pensamento);
  }

  listar(): Observable<Pensamento[]> {
    return this.http.get<Pensamento[]>(this.urlAPI);
  }

  editar(pensamento: Pensamento): Observable<Pensamento> {
    const url = `${this.urlAPI}/${pensamento.id}`;

    return this.http.put<Pensamento>(url, pensamento);
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
