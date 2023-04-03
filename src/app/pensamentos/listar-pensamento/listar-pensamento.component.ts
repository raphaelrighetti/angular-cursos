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
  paginaAtual = 0;
  haMaisPensamentos = true;
  favoritos = false;
  filtro = '';

  constructor(private service: PensamentoService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.paginaAtual = 0;
    this.haMaisPensamentos = true;

    this.service
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((pageable) => {
        console.log(pageable);

        this.pensamentos = pageable.content;

        if (this.favoritos) {
          this.pensamentosFavoritos = pageable.content;
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
      .subscribe((pageable) => {
        if (pageable.content.length) {
          this.pensamentos.push(...pageable.content);
          if (this.favoritos) {
            this.pensamentosFavoritos.push(...pageable.content);
          }
        } else {
          this.haMaisPensamentos = false;
        }
      });
  }

  pesquisarPensamentos() {
    this.paginaAtual = 0;
    this.haMaisPensamentos = true;

    this.service
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((pageable) => {
        this.pensamentos = pageable.content;

        if (this.favoritos) {
          this.pensamentosFavoritos = pageable.content;
        }
      });
  }
}
