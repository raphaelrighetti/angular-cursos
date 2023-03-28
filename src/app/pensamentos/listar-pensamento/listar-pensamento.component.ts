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

  constructor(private service: PensamentoService) {}

  ngOnInit(): void {
    this.service.listar(this.paginaAtual).subscribe((pensamentos) => {
      this.pensamentos = pensamentos;
    });
  }

  carregarMaisPensamentos() {
    this.service.listar(++this.paginaAtual).subscribe((pensamentos) => {
      if (pensamentos.length) {
        this.pensamentos.push(...pensamentos);
      } else {
        this.haMaisPensamentos = false;
      }
    });
  }
}
