import { PensamentoService } from '../../../services/pensamento.service';
import { Pensamento } from '../../../interfaces/pensamento';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.scss'],
})
export class PensamentoComponent {
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

  @Input()
  pensamentosFavoritos: Pensamento[] = [];

  constructor(private service: PensamentoService) {}

  largura(): string {
    if (this.pensamento.conteudo.length >= 256) {
      return 'pensamento-g';
    } else {
      return 'pensamento-p';
    }
  }

  mudarIconeFavorito(): string {
    if (this.pensamento.favorito) {
      return 'ativo';
    } else {
      return 'inativo';
    }
  }

  mudarFavorito() {
    this.service.mudarFavorito(this.pensamento).subscribe(() => {
      this.pensamentosFavoritos.splice(
        this.pensamentosFavoritos.indexOf(this.pensamento),
        1
      );
    });
  }

  mudarIconePrivado(): string {
    if (this.pensamento.privado) {
      return 'privado';
    } else {
      return 'publico';
    }
  }

  mudarPrivado() {
    this.service.mudarPrivado(this.pensamento).subscribe(() => {});
  }
}
