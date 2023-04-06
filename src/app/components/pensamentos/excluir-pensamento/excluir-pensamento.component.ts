import { ActivatedRoute, Router } from '@angular/router';
import { PensamentoService } from '../../../services/pensamento.service';
import { Pensamento } from '../../../interfaces/pensamento';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-excluir-pensamento',
  templateUrl: './excluir-pensamento.component.html',
  styleUrls: ['./excluir-pensamento.component.scss'],
})
export class ExcluirPensamentoComponent implements OnInit {
  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: false,
    privado: false,
    usuarioId: 0,
  };

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id') as string;
    const id = parseInt(idParam);

    this.service.buscarPorId(id).subscribe((pensamento) => {
      this.pensamento = pensamento;
    });
  }

  excluirPensamento() {
    if (this.pensamento.id) {
      this.service.excluir(this.pensamento.id).subscribe(() => {
        this.router.navigate(['/pensamentos/listar']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/pensamentos/listar']);
  }
}
