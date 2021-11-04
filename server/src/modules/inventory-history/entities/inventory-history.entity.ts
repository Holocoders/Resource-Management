import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from "../../user/entities/user.entity";
import { Prop } from "@nestjs/mongoose";
import { Item } from "../../item/entities/item.entity";

export enum InventoryActivity {
  ADD,
  REMOVE
}

@ObjectType()
export class InventoryHistory {

  @Field(() => ID)
  _id: string;

  @Prop()
  itemId: Item;

  @Prop()
  userId: User;

  @Prop()
  quantity: number;

  @Prop()
  currentDate: Date;

  @Prop()
  status: InventoryActivity;
}
