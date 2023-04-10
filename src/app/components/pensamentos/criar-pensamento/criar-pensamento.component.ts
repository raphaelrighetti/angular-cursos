import { PensamentoService } from '../../../services/pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pensamento } from 'src/app/interfaces/pensamento';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.scss'],
})
export class CriarPensamentoComponent implements OnInit {
  usuarioId!: number;
  formulario!: FormGroup;

  constructor(
    private pensamentoService: PensamentoService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.usuarioId = this.authService.getObjetoToken().usuarioId;

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
      privado: [false],
    });
  }

  criarPensamento(event: Event) {
    event.preventDefault();

    const pensamento: Pensamento = {
      conteudo: this.formulario.get('conteudo')?.value as string,
      autoria: this.formulario.get('autoria')?.value as string,
      modelo: this.formulario.get('modelo')?.value as string,
      favorito: false,
      privado: this.formulario.get('privado')?.value,
      usuarioId: this.usuarioId,
    };

    if (this.formulario.valid) {
      this.pensamentoService.criar(pensamento).subscribe(() => {
        this.router.navigate(['pensamentos/listar/' + this.usuarioId]);
      });
    }
  }

  meuMural() {
    this.router.navigate(['pensamentos/listar/' + this.usuarioId]);
  }

  statusBotao(): string {
    if (this.formulario.valid) {
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }
}
