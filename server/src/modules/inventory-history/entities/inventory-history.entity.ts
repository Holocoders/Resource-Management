import {Field, ID, InputType, ObjectType} from '@nestjs/graphql';
import {User} from '../../user/entities/user.entity';
import {Prop} from '@nestjs/mongoose';
import {Item} from '../../item/entities/item.entity';
import {Schema as MongooseSchema} from "mongoose";

export enum InventoryActivity {
  ADD,
  REMOVE,
}

@ObjectType()
@InputType('InventoryHistoryType')
export class InventoryHistory {
  @Field(() => ID)
  _id: string;

  @Prop({type: MongooseSchema.Types.ObjectId, ref: Item.name})
  itemId: MongooseSchema.Types.ObjectId | Item;

  @Prop({type: MongooseSchema.Types.ObjectId, ref: User.name})
  userId: MongooseSchema.Types.ObjectId | User;

  @Prop()
  quantity: number;

  @Prop()
  currentDate: Date;

  @Prop()
  status: InventoryActivity;
}
