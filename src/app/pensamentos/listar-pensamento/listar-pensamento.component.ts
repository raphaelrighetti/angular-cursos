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

  paginaAtual = 1;
  haMaisPensamentos = true;
  filtro = '';

  constructor(private service: PensamentoService) {}

  ngOnInit(): void {
    this.service
      .listar(this.paginaAtual, this.filtro)
      .subscribe((pensamentos) => {
        this.pensamentos = pensamentos;
      });
  }

  carregarMaisPensamentos() {
    this.service
      .listar(++this.paginaAtual, this.filtro)
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
      .listar(this.paginaAtual, this.filtro)
      .subscribe((pensamentos) => {
        this.pensamentos = pensamentos;
      });
  }
}
