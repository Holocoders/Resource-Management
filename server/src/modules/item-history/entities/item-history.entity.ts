import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Item } from '../../item/entities/item.entity';
import { Document, Schema as MongooseSchema } from 'mongoose';

export enum ItemActivity {
  BUY = 'BUY',
  RENT = 'RENT',
}

export enum ItemState {
  ORDERED = 'ORDERED',
  ISSUED = 'ISSUED',
  CANCELLED = 'CANCELLED',
  RETURNED = 'RETURNED',
}

registerEnumType(ItemState, { name: 'ItemState' });
registerEnumType(ItemActivity, { name: 'ItemActivity' });

@Schema()
@ObjectType()
export class ItemHistory {
  @Field(() => ID)
  _id?: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Item.name,
    autopopulate: true,
  })
  @Field(() => Item)
  item: MongooseSchema.Types.ObjectId | Item;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    autopopulate: true,
  })
  @Field(() => User)
  user: MongooseSchema.Types.ObjectId | User;

  @Prop({ default: 1 })
  quantity: number;

  @Prop({ default: new Date() })
  activityDate?: Date;

  @Prop()
  @Field(() => ItemState)
  itemState: ItemState;

  @Prop()
  @Field(() => ItemActivity)
  activityType: ItemActivity;

  @Prop({ default: new Date() })
  issueDate?: Date;

  @Prop({ default: new Date() })
  dueDate?: Date;
}

export type ItemHistoryDocument = ItemHistory & Document;
export const ItemHistorySchema = SchemaFactory.createForClass(ItemHistory);
