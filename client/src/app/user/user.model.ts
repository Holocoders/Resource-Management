export class User {
  _id: string;
  email: string;
  name: string;
  password: string;
  loggedIn: boolean;
  token: string;

  constructor() {
    this.loggedIn = false;
  }
}
