import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateNodeInput {
  parent: string;
  isItem: boolean;

  constructor(parent: string, isItem = false) {
    this.parent = parent;
    this.isItem = isItem;
  }
}
