import {ObjectType, Field, Int, ID} from '@nestjs/graphql';
import {User} from "../../user/entities/user.entity";
import {Prop} from "@nestjs/mongoose";
import {Item} from "../../item/entities/item.entity";

export enum ItemActivity {
  BUY,
  RENT
}

@ObjectType()
export class ItemHistory {

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
