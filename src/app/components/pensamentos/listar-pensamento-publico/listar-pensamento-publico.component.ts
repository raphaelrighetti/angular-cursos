import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pensamento } from 'src/app/interfaces/pensamento';
import { AuthService } from 'src/app/services/auth.service';
import { PensamentoService } from 'src/app/services/pensamento.service';

@Component({
  selector: 'app-listar-pensamento-publico',
  templateUrl: './listar-pensamento-publico.component.html',
  styleUrls: ['./listar-pensamento-publico.component.scss'],
})
export class ListarPensamentoPublicoComponent {
  pensamentos: Pensamento[] = [];
  usuarioId!: number;

  paginaAtual = 0;
  haMaisPensamentos = true;
  filtro = '';

  constructor(
    private authService: AuthService,
    private pensamentoService: PensamentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listar();

    this.usuarioId = this.authService.getObjetoToken().usuarioId;
  }

  listar() {
    this.paginaAtual = 0;
    this.haMaisPensamentos = true;

    this.pensamentoService
      .listarPublicos(this.paginaAtual, this.filtro)
      .subscribe((pageable) => {
        this.pensamentos = pageable.content;
      });
  }

  carregarMaisPensamentos() {
    this.pensamentoService
      .listarPublicos(++this.paginaAtual, this.filtro)
      .subscribe((pageable) => {
        if (pageable.content.length) {
          this.pensamentos.push(...pageable.content);
        } else {
          this.haMaisPensamentos = false;
        }
      });
  }

  pesquisarPensamentos() {
    this.paginaAtual = 0;
    this.haMaisPensamentos = true;

    this.pensamentoService
      .listarPublicos(this.paginaAtual, this.filtro)
      .subscribe((pageable) => {
        this.pensamentos = pageable.content;
      });
  }

  meuMural() {
    this.router.navigate(['/pensamentos/listar/' + this.usuarioId]);
  }

  logado() {
    return this.authService.logado();
  }
}
