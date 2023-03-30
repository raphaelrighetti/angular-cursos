import { PensamentoService } from './../pensamento.service';
import { Pensamento } from './../pensamento';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.scss'],
})
export class ListarPensamentoComponent implements OnInit {
  pensamentos: Pensamento[] = [];
  pensamentosFavoritos: Pensamento[] = [];

  titulo = 'Meu Mural';
  paginaAtual = 1;
  haMaisPensamentos = true;
  favoritos = false;
  filtro = '';

  constructor(private service: PensamentoService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.paginaAtual = 1;
    this.haMaisPensamentos = true;

    this.service
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((pensamentos) => {
        this.pensamentos = pensamentos;

        if (this.favoritos) {
          this.pensamentosFavoritos = pensamentos;
        }
      });
  }

  listarTodos() {
    this.titulo = 'Meu Mural';
    this.favoritos = false;

    this.listar();
  }

  listarFavoritos() {
    this.titulo = 'Meus Favoritos';
    this.favoritos = true;

    this.listar();
  }

  carregarMaisPensamentos() {
    this.service
      .listar(++this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((pensamentos) => {
        if (pensamentos.length) {
          this.pensamentos.push(...pensamentos);
        } else {
          this.haMaisPensamentos = false;
        }
      });
  }

  pesquisarPensamentos() {
    this.paginaAtual = 1;
    this.haMaisPensamentos = true;

    this.service
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((pensamentos) => {
        this.pensamentos = pensamentos;
      });
  }
}
