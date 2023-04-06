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
  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: [0],
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
      favorito: [false],
    });

    const idParam = this.route.snapshot.paramMap.get('id') as string;
    const id = parseInt(idParam);

    this.service.buscarPorId(id).subscribe((pensamento) => {
      this.formulario.controls['id'].setValue(pensamento.id);
      this.formulario.controls['conteudo'].setValue(pensamento.conteudo);
      this.formulario.controls['autoria'].setValue(pensamento.autoria);
      this.formulario.controls['modelo'].setValue(pensamento.modelo);
      this.formulario.controls['favorito'].setValue(pensamento.favorito);
    });
  }

  editarPensamento() {
    console.log(this.formulario.valid);
    if (this.formulario.valid) {
      const pensamento: Pensamento = {
        id: this.formulario.get('id')?.value,
        conteudo: this.formulario.get('conteudo')?.value,
        autoria: this.formulario.get('autoria')?.value,
        modelo: this.formulario.get('modelo')?.value,
        favorito: this.formulario.get('favorito')?.value,
        privado: false,
        usuarioId: 0,
      };

      this.service.editar(pensamento).subscribe(() => {
        this.router.navigate(['/pensamentos/listar']);
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
