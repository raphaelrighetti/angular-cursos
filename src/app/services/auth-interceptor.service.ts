import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { ObjetoToken } from '../interfaces/objeto-token';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService);
    const router = this.injector.get(Router);

    if (!authService.getToken()) {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status) {
          return authService.refreshToken().pipe(
            switchMap((data: ObjetoToken) => {
              authService.saveTokens(data);
              return next.handle(
                this.addTokenHeader(req, authService.getToken())
              );
            }),
            catchError((err) => {
              router.navigate(['/login']);

              console.log('meu deus do ceu');

              return throwError(() => err);
            })
          );
        }

        router.navigate(['/login']);

        return throwError(() => err);
      })
    );
  }

  addTokenHeader(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: {
        Authorization: token,
      },
    });
  }
}
