import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    private service: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
          Validators.maxLength(20),
        ]),
      ],
      senha: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
  }

  sohMinusculas() {
    const username = this.formulario.get('username')?.value as string;

    this.formulario.controls['username'].setValue(username.toLowerCase());
  }

  registrar(event: Event) {
    event.preventDefault();

    const username = this.formulario.get('username')?.value as string;
    const senha = this.formulario.get('senha')?.value as string;

    const usuario: Usuario = {
      username,
      senha,
    };

    this.service.registrar(usuario).subscribe((usuario) => {
      console.log(usuario);
    });

    this.router.navigate(['/login']);
  }

  statusBotao(): string {
    if (this.formulario.valid) {
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }
}