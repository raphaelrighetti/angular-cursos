import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../usuario.service';
import { Usuario } from '../../usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    private service: UsuarioService,
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

  logar(event: Event) {
    event.preventDefault();

    const username = this.formulario.get('username')?.value as string;
    const senha = this.formulario.get('senha')?.value as string;

    const usuario: Usuario = {
      username,
      senha,
    };

    this.service.logar(usuario).subscribe((obj) => {
      console.log(obj.token);
    });
  }

  statusBotao(): string {
    if (this.formulario.valid) {
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }
}
