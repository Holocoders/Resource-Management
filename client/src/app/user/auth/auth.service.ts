import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user.model';
import { Apollo, gql } from "apollo-angular";
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class AuthService {

  user = new BehaviorSubject<User>(new User());

  constructor(private apollo: Apollo) {}

  // @ts-ignore
  signup(data): Observable<any> {}


  login(user: User): Observable<void> {
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation LoginMutation($loginEmail: String!, $loginPassword: String!) {
          login(email: $loginEmail, password: $loginPassword)
        }
      `,
      variables: {
        loginEmail: user.username,
        loginPassword: user.password
      }
    });
    return mutation.pipe(
      map((result) => {
        user.token = (result.data as any).login;
        user.loggedIn = true;
        this.user.next(user);
      })
    )
  }

  autoLogin() {
    let stringUser = localStorage.getItem("user");
    if (!stringUser) stringUser = sessionStorage.getItem("user");
    if (!stringUser) {
      this.user.next(new User());
      return false;
    }
    const user: User = JSON.parse(stringUser);
    this.user.next(user);
    return user.loggedIn;
  }

  logOut(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.user.next(new User());
  }
}
