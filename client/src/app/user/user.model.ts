export class User {
  _id: string;
  email: string;
  name: string;
  loggedIn: boolean = false;
  token: string;
}
