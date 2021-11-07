import {User} from "../user/user.model";

export class Item {
  _id: string;
  name: string;
  parent: string;
  createdBy: User;
  price: number;
  description: string = "";
  quantity: number;
}
