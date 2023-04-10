import { UsuarioService } from './../../../services/usuario.service';
import { Component, Input, OnInit } from '@angular/core';
import { Pensamento } from 'src/app/interfaces/pensamento';

@Component({
  selector: 'app-pensamento-publico',
  templateUrl: './pensamento-publico.component.html',
  styleUrls: ['./pensamento-publico.component.scss'],
})
export class PensamentoPublicoComponent implements OnInit {
  username!: string;

  @Input()
  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: false,
    privado: false,
    usuarioId: 0,
  };

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService
      .detalhar(this.pensamento.usuarioId)
      .subscribe((usuario) => {
        this.username = usuario.username;
      });
  }

  largura(): string {
    if (this.pensamento.conteudo.length >= 256) {
      return 'pensamento-g';
    } else {
      return 'pensamento-p';
    }
  }
}
