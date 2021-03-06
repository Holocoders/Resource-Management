import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (req.url.indexOf('googleapis') != -1 || req.headers.get('skip')) {
      return next.handle(req);
    }
    return this.auth.user.pipe(
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const modReq = req.clone({
          headers: req.headers.append('Authorization', 'Bearer ' + user.token),
        });
        return next.handle(modReq);
      }),
    );
  }
}
