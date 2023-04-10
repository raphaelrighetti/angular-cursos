import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PensamentoService } from '../../../services/pensamento.service';
import { Pensamento } from '../../../interfaces/pensamento';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.scss'],
})
export class EditarPensamentoComponent implements OnInit {
  id!: number;
  favorito!: boolean;
  privado!: boolean;
  usuarioId!: number;

  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
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
      modelo: [''],
    });

    const idParam = this.route.snapshot.paramMap.get('id') as string;
    const id = parseInt(idParam);

    this.service.buscarPorId(id).subscribe((pensamento) => {
      this.id = pensamento.id as number;
      this.favorito = pensamento.favorito;
      this.privado = pensamento.privado;
      this.usuarioId = pensamento.usuarioId;

      this.formulario.controls['conteudo'].setValue(pensamento.conteudo);
      this.formulario.controls['autoria'].setValue(pensamento.autoria);
      this.formulario.controls['modelo'].setValue(pensamento.modelo);
    });
  }

  editarPensamento(event: Event) {
    event.preventDefault();

    console.log(this.formulario.valid);
    if (this.formulario.valid) {
      const pensamento: Pensamento = {
        id: this.id,
        conteudo: this.formulario.get('conteudo')?.value,
        autoria: this.formulario.get('autoria')?.value,
        modelo: this.formulario.get('modelo')?.value,
        favorito: this.favorito,
        privado: this.privado,
        usuarioId: this.usuarioId,
      };

      this.service.editar(pensamento).subscribe(() => {
        this.router.navigate(['/pensamentos/listar/' + this.usuarioId]);
      });
    }
  }

  meuMural() {
    this.router.navigate(['/pensamentos/listar/' + this.usuarioId]);
  }

  statusBotao(): string {
    if (this.formulario.valid) {
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }
}
