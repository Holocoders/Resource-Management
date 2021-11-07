import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, firstValueFrom, throwError} from 'rxjs';
import { User } from '../user.model';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(new User());

  constructor(private apollo: Apollo) {}

  signup(user: User, password: string) {
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
        user.loggedIn = true;
        this.user.next(user);
      }),
      catchError(() => {
        return throwError(void 0);
      })
    );
  }

  signIn(user: User, password: string) {
    const mutation = this.apollo.mutate({
      mutation: gql`
        mutation LoginMutation($loginEmail: String!, $loginPassword: String!) {
          login(email: $loginEmail, password: $loginPassword)
        }
      `,
      variables: {
        loginEmail: user.email,
        loginPassword: password,
      },
    });
    return mutation.pipe(
      map((result) => {
        user.token = (result.data as any).login;
        user.loggedIn = true;
        this.user.next(user);
      }),
      catchError(() => {
        return throwError(void 0);
      })
    );
  }

  autoLogin() {
    const query = gql`
      query currentUser {
        currentUser {
          _id
          email
          name
          token
        }
      }
    `;
    const user = new User();
    return this.apollo.watchQuery({query}).valueChanges
      .subscribe((result: { data: any; }) => {
        let currentUser = (result.data as any).currentUser;
        user._id = currentUser._id;
        user.name = currentUser.name;
        user.email = currentUser.email;
        user.token = currentUser.token;
        user.loggedIn = true;
        this.user.next(user);
        return user;
    }, () => {
        this.user.next(user);
        return user;
      })
  }

  logOut(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.user.next(new User());
  }
}
