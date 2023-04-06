import { PensamentoService } from '../../../services/pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pensamento } from 'src/app/interfaces/pensamento';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.scss'],
})
export class CriarPensamentoComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      autoria: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ]),
      ],
      modelo: ['MODELO1'],
      favorito: [false],
    });
  }

  criarPensamento(event: Event) {
    event.preventDefault();

    const pensamento: Pensamento = {
      conteudo: this.formulario.get('conteudo')?.value as string,
      autoria: this.formulario.get('autoria')?.value as string,
      modelo: this.formulario.get('modelo')?.value as string,
      favorito: false,
      privado: false,
      usuarioId: 0,
    };

    if (this.formulario.valid) {
      this.service.criar(pensamento).subscribe(() => {
        this.router.navigate(['pensamentos/listar']);
      });
    }
  }

  statusBotao(): string {
    if (this.formulario.valid) {
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }
}
