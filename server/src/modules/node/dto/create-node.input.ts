import {Field, InputType} from '@nestjs/graphql';
import {Schema as MongooseSchema} from "mongoose";

@InputType()
export class CreateNodeInput {
  @Field(() => String)
  parent: string;
  isItem: boolean;
  @Field(() => String)
  createdBy?: string;

  constructor(parent: string, createdBy: string, isItem = false) {
    this.parent = parent;
    this.isItem = isItem;
    this.createdBy = createdBy;
  }
}
