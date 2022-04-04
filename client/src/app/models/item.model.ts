import { Node } from './node.model';

export class Item {
  node: Node;
  name: string;
  price: number;
  description: string;
  packItems?: any[];
  quantity: number;
}
