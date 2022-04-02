import { Field, InputType } from '@nestjs/graphql';
import { NodeType } from '../entities/node.entity';

@InputType()
export class CreateNodeInput {
  @Field(() => String)
  parent: string;
  isItem: boolean;
  @Field(() => String)
  type: NodeType;
  @Field(() => String)
  createdBy?: string;

  constructor(parent: string, createdBy: string, type: NodeType) {
    this.parent = parent;
    this.type = type;
    this.createdBy = createdBy;
  }
}
