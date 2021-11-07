import {Field, InputType} from '@nestjs/graphql';
import {Schema as MongooseSchema} from "mongoose";
import {InventoryActivity} from "../entities/inventory-history.entity";

@InputType()
export class CreateInventoryHistoryInput {
  @Field(() => String)
  itemId: string;

  @Field(() => String)
  userId?: string;

  quantity: number;

  activityType: InventoryActivity;
}
