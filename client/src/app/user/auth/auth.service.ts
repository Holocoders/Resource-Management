import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { User } from '../user.model';
import { Apollo, gql } from "apollo-angular";
import { map } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class AuthService {

  user = new BehaviorSubject<User>(new User());

  constructor(private apollo: Apollo) {}


  signup(user: User) {
    const {name, email, password} = user;
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation createUser ($createUserInput: CreateUserInput!) {
          createUser (createUserInput: $createUserInput) {
            _id
            email
            name
            password
            token
          }
        }
      `,
      variables: {
        createUserInput: {
          name, email, password
        }
      }
    });
    return mutation.pipe(
      map(({data}) => {
        const user = (data as any).createUser as User;
        user.loggedIn = true;
        this.user.next(user);
      }),
      catchError((e) => {
        return throwError(void 0);
      })
    )
  }


  signIn(user: User) {
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation LoginMutation($loginEmail: String!, $loginPassword: String!) {
          login(email: $loginEmail, password: $loginPassword)
        }
      `,
      variables: {
        loginEmail: user.email,
        loginPassword: user.password
      }
    });
    return mutation.pipe(
      map((result) => {
        user.token = (result.data as any).login;
        user.loggedIn = true;
        this.user.next(user);
      }),
      catchError((e) => {
        return throwError(void 0);
      })
    );
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
