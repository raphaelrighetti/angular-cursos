import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss'],
})
export class CabecalhoComponent {
  usuarioId!: number;
  username!: string;

  constructor(private router: Router, private authService: AuthService) {}

  homeUsuario() {
    this.router.navigate(['/usuarios/' + this.usuarioId]);
  }

  logado() {
    if (this.authService.logado() && !this.usuarioId) {
      this.usuarioId = this.authService.getObjetoToken().usuarioId;

      this.username = this.authService.getObjetoToken().username;
    }

    return this.authService.logado();
  }
}
