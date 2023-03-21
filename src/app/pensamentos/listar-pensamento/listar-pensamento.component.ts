import { Component } from '@angular/core';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.scss'],
})
export class ListarPensamentoComponent {
  pensamentos = [
    {
      conteudo: 'I Love Angular',
      autoria: 'Dev',
      modelo: 'modelo3',
    },
    {
      conteudo:
        'Mussum Ipsum, cacilds vidis litro abertis. Quem num gosta di mé, boa gentis num é.Sapien in monti palavris qui num significa nadis i pareci latim.Diuretics paradis num copo é motivis de denguis.Nullam volutpat risus nec leo commodo, ut interdum diam laoreet. Sed non consequat odio.',
      autoria: 'Mussum Ipsum',
      modelo: 'modelo1',
    },
  ];
}
