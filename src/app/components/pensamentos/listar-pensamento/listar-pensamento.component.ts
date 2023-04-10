import { PensamentoService } from '../../../services/pensamento.service';
import { Pensamento } from '../../../interfaces/pensamento';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.scss'],
})
export class ListarPensamentoComponent implements OnInit {
  pensamentos: Pensamento[] = [];
  pensamentosFavoritos: Pensamento[] = [];

  titulo = 'Meu Mural';
  usuarioId = parseInt(this.route.snapshot.paramMap.get('id') as string);
  paginaAtual = 0;
  haMaisPensamentos = true;
  favoritos = false;
  filtro = '';

  constructor(
    private service: PensamentoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.paginaAtual = 0;
    this.haMaisPensamentos = true;

    this.service
      .listar(this.paginaAtual, this.filtro, this.favoritos, this.usuarioId)
      .subscribe((pageable) => {
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
      .listar(++this.paginaAtual, this.filtro, this.favoritos, this.usuarioId)
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
      .listar(this.paginaAtual, this.filtro, this.favoritos, this.usuarioId)
      .subscribe((pageable) => {
        this.pensamentos = pageable.content;

        if (this.favoritos) {
          this.pensamentosFavoritos = pageable.content;
        }
      });
  }
}
