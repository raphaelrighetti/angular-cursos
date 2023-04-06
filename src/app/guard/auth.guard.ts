import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private service: AuthService, private router: Router) {}

  canActivate() {
    if (this.service.logado()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
