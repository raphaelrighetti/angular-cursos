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

    if (!authService.getToken()) {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status) {
          return authService.refreshToken().pipe(
            switchMap((data: ObjetoToken) => {
              console.log(data);

              authService.saveTokens(data);
              return next.handle(
                this.addTokenHeader(req, authService.getToken())
              );
            }),
            catchError((err) => {
              return throwError(() => err);
            })
          );
        }

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
