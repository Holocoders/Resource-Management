import {Field, InputType} from '@nestjs/graphql';
import {Schema as MongooseSchema} from "mongoose";

@InputType()
export class CreateItemInput {
  _id?: string;
  name: string;
  @Field(() => String)
  createdBy?: MongooseSchema.Types.ObjectId;
  price: number;
  description?: string;
  quantity?: number;
  parent: string;
}
