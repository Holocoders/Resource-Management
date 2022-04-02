import { User } from '../user/user.model';

export enum NodeType {
  CATEGORY = 'CATEGORY',
  ITEM = 'ITEM',
  PACK = 'PACK',
  FACILITY = 'FACILITY',
}

export class Node {
  _id: string;
  type: NodeType;
  parent: Node;
  createdBy: User;
  categoryCount: number;
  itemCount: number;
  packCount: number;
}
