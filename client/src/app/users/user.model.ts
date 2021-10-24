export class User {
  constructor(private _token: string, private _id: string, private _username: string) {
  }

  get token(): any {
    return this._token;
  }

  get username(): any {
    return this._username;
  }

  get id(): any {
    return this._id;
  }
}
