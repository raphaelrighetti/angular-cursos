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

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private authService: AuthService
  ) {}

  homeUsuario() {
    this.router.navigate(['/usuarios/' + this.usuarioId]);
  }

  logado() {
    if (this.authService.logado() && !this.usuarioId) {
      this.usuarioId = this.authService.getObjetoToken().usuarioId;

      this.usuarioService.detalhar(this.usuarioId).subscribe((usuario) => {
        this.username = usuario.username;
      });
    }

    return this.authService.logado();
  }
}
