import { User } from '../user/user.model';

export class Node {
  _id: string;
  isItem: boolean;
  parent: Node;
  createdBy: User;
  categoryCount: number;
  itemCount: number;
}
