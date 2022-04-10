export class User {
  constructor(
    public email: string,
    public name: string,
    public token?: string,
    public _id?: string,
  ) {}
}
