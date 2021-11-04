import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree, } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { LocalMessageService } from "../../shared/local-message.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private api: AuthService,
    private localMessageService: LocalMessageService,
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
      take(1),
      map((user) => {
        if (user.loggedIn) {
          return true;
        }
        this.localMessageService.addToastMessage({detail: "Authorization Error! Sign-In again.", severity: "error"})
        return this.router.createUrlTree(['/user/signin']);
      })
    );
  }
}
