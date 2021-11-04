export class User {
  _id: string;
  email: string;
  name: string;
  loggedIn: boolean;
  token: string;

  constructor() {
    this.loggedIn = false;
  }
}
