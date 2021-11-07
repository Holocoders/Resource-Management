import {Field, InputType} from '@nestjs/graphql';
import {Schema as MongooseSchema} from "mongoose";
import {InventoryActivity} from "../entities/inventory-history.entity";

@InputType()
export class CreateInventoryHistoryInput {
  @Field(() => String)
  itemId: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  userId: MongooseSchema.Types.ObjectId;

  quantity: number;

  currentDate: Date;

  status: InventoryActivity;
}
