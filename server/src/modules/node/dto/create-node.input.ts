import {Field, InputType} from '@nestjs/graphql';
import {Schema as MongooseSchema} from "mongoose";

@InputType()
export class CreateNodeInput {
  @Field(() => String)
  parent: MongooseSchema.Types.ObjectId;
  isItem: boolean;

  constructor(parent: MongooseSchema.Types.ObjectId, isItem = false) {
    this.parent = parent;
    this.isItem = isItem;
  }
}
