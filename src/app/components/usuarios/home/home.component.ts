import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  username!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const usuarioId = parseInt(
      this.route.snapshot.paramMap.get('id') as string
    );

    if (usuarioId != this.authService.getObjetoToken().usuarioId) {
      this.router.navigate(['/login']);
    }

    this.usuarioService.detalhar(usuarioId).subscribe((usuario) => {
      this.username = usuario.username;
    });
  }
}
