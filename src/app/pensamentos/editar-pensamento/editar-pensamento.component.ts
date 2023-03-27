import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PensamentoService } from './../pensamento.service';
import { Pensamento } from './../pensamento';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.scss'],
})
export class EditarPensamentoComponent implements OnInit {
  pensamentoId = 0;

  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id') as string;
    this.pensamentoId = parseInt(idParam);

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

    this.service.buscarPorId(this.pensamentoId).subscribe((pensamento) => {
      this.formulario.controls['conteudo'].setValue(pensamento.conteudo);
      this.formulario.controls['autoria'].setValue(pensamento.autoria);
      this.formulario.controls['modelo'].setValue(pensamento.modelo);
    });
  }

  editarPensamento() {
    console.log(this.formulario.valid);
    if (this.formulario.valid) {
      const pensamento: Pensamento = {
        id: this.pensamentoId,
        conteudo: this.formulario.get('conteudo')?.value,
        autoria: this.formulario.get('autoria')?.value,
        modelo: this.formulario.get('modelo')?.value,
      };

      this.service.editar(pensamento).subscribe(() => {
        this.router.navigate(['/pensamento/listar']);
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
