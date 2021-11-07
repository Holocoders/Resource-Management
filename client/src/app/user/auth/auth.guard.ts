import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
import {Observable, skip} from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private api: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.api.user.pipe(
      map((user) => {
        return true;
        if (user.loggedIn) {
          return true;
        }
        this.messageService.add({
          detail: 'Authorization Error! Sign-In again.',
          severity: 'error',
        });
        return this.router.createUrlTree(['/user/signin']);
      })
    );
  }
}
