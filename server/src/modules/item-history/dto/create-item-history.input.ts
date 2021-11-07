import {Field, InputType} from '@nestjs/graphql';
import {Schema as MongooseSchema} from "mongoose";

@InputType()
export class CreateItemHistoryInput {
  @Field(() => String)
  itemId: MongooseSchema.Types.ObjectId;
  @Field(() => String)
  userId?: MongooseSchema.Types.ObjectId;
  quantity: number;
  currentDate?: Date;
  cancelled: boolean;
  issued: boolean;
  status: boolean;
  issueDate?: Date;
  dueDate?: Date;
}
