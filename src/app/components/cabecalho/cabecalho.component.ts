import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss'],
})
export class CabecalhoComponent implements OnInit {
  username!: string;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.usuarioService
      .detalhar(this.authService.getObjetoToken().usuarioId)
      .subscribe((usuario) => {
        this.username = usuario.username;
      });
  }

  logado() {
    return this.authService.logado();
  }
}
