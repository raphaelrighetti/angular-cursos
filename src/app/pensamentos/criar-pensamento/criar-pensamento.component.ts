import { Component } from '@angular/core';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.scss'],
})
export class CriarPensamentoComponent {
  pensamento = {
    id: '',
    conteudo: '',
    autoria: '',
    modelo: '',
  };

  criarPensamento() {
    alert('Pensamento criado!');
  }

  cancelar() {
    alert('Cancelou a criação!');
  }
}
