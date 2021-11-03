export class User {
  _id: string;
  loggedIn: boolean;
  token: string;
  username: string;
  password: string;

  constructor() {
    this.loggedIn = false;
  }
}
