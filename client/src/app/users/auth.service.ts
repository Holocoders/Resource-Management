import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import { User } from './user.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  // @ts-ignore
  user = new BehaviorSubject<User>(null);

  constructor(private router: Router) {
  }

  // @ts-ignore
  signup(data): Observable<any> {
  }

  // @ts-ignore
  login(data): Observable<any> {
  }

  autoLogin(): void {
  }

  logOut(): void {
  }
}
