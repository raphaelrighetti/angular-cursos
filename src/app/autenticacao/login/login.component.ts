import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

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

    console.log(`Nome de usuário: ${username}`);
    console.log(`Senha: ${senha}`);
  }

  statusBotao(): string {
    if (this.formulario.valid) {
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }
}
