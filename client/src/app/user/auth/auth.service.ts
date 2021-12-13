import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { User } from '../user.model';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  user = new BehaviorSubject<User>(null);

  constructor(private apollo: Apollo) {}

  signup(user: User, password: string, rememberMe = false) {
    const { name, email } = user;
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation createUser($createUserInput: CreateUserInput!) {
          createUser(createUserInput: $createUserInput) {
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
          name,
          email,
          password,
        },
      },
    });
    return mutation.pipe(
      map(({ data }) => {
        const user = (data as any).createUser as User;
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          sessionStorage.setItem('user', JSON.stringify(user));
        }
        this.user.next(user);
      }),
      catchError(() => {
        return throwError(void 0);
      })
    );
  }

  signIn(email: string, password: string, rememberMe = false) {
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            name
            token
          }
        }
      `,
      variables: {
        email,
        password,
      },
    });
    return mutation.pipe(
      map((result) => {
        const data = (result.data as any).login;
        const user = new User(email, data.name, data.token);
        this.user.next(user);
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          sessionStorage.setItem('user', JSON.stringify(user));
        }
      }),
      catchError(() => {
        return throwError(void 0);
      })
    );
  }

  autoLogin() {
    let stringUser = localStorage.getItem('user');
    if (!stringUser) stringUser = sessionStorage.getItem('user');
    if (!stringUser) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.user.next(null);
      return false;
    }
    const user: User = JSON.parse(stringUser);
    this.user.next(user);
    return !!user;
  }

  logOut(): void {
    sessionStorage.clear();
    localStorage.clear();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.user.next(null);
  }
}
