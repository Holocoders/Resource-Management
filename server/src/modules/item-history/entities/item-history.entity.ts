import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from "../../user/entities/user.entity";
import { Prop } from "@nestjs/mongoose";
import { Item } from "../../item/entities/item.entity";
import {Document} from "mongoose";


export type ItemHistoryDocument = ItemHistory & Document;

export enum ItemActivity {
  BUY,
  RENT
}

@ObjectType()
export class ItemHistory {
  @Prop()
  itemId: Item;

  @Prop()
  userId: User;

  @Prop()
  quantity: number;

  @Prop()
  currentDate: Date;

  @Prop()
  cancelled: boolean;

  @Prop()
  issued: boolean;

  @Prop()
  status: boolean;

  @Prop()
  issueDate: Date;

  @Prop()
  dueDate: Date;
}
