import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss'],
})
export class EditarUsuarioComponent implements OnInit {
  usuarioId!: number;
  username!: string;

  formulario!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.usuarioId = this.authService.getObjetoToken().usuarioId;

    const usuarioId = parseInt(
      this.route.snapshot.paramMap.get('id') as string
    );

    if (usuarioId != this.usuarioId) {
      this.router.navigate(['/login']);
    }

    this.username = this.authService.getObjetoToken().username;

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

    this.usuarioService.detalhar(this.usuarioId).subscribe((usuario) => {
      this.formulario.controls['username'].setValue(usuario.username);
    });
  }

  editar(event: Event) {
    event.preventDefault();

    const usuario: Usuario = {
      username: this.formulario.get('username')?.value,
      senha: this.formulario.get('senha')?.value,
    };

    this.usuarioService.atualizar(this.usuarioId, usuario).subscribe(() => {
      this.router.navigate(['/pensamentos/listar/' + this.usuarioId]);
    });
  }

  meuMural() {
    this.router.navigate(['/pensamentos/listar/' + this.usuarioId]);
  }

  sohMinusculas() {
    const username = this.formulario.get('username')?.value as string;

    this.formulario.controls['username'].setValue(username.toLowerCase());
  }

  statusBotao(): string {
    if (this.formulario.valid) {
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }
}
