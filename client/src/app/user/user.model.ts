export class User {
  constructor(
    public _id: string,
    public email: string,
    public name: string,
    public token?: string,
  ) {}
}
