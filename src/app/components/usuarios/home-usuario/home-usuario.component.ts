import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-usuario',
  templateUrl: './home-usuario.component.html',
  styleUrls: ['./home-usuario.component.scss'],
})
export class HomeUsuarioComponent implements OnInit {
  usuarioId!: number;
  username!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.usuarioId = this.authService.getObjetoToken().usuarioId;

    const usuarioIdUrl = parseInt(
      this.route.snapshot.paramMap.get('id') as string
    );

    if (usuarioIdUrl != this.usuarioId) {
      this.router.navigate(['/login']);
    }

    this.username = this.authService.getObjetoToken().username;
  }

  editar() {
    this.router.navigate(['/usuarios/editar/' + this.usuarioId]);
  }

  excluir() {}
}
