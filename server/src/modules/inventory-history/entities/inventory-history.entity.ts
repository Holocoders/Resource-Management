import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Item } from '../../item/entities/item.entity';
import { Document, Schema as MongooseSchema } from 'mongoose';

export enum InventoryActivity {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
}

registerEnumType(InventoryActivity, { name: 'InventoryActivity' });

@ObjectType()
@Schema()
export class InventoryHistory {
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

  @Prop()
  quantity: number;

  @Prop()
  @Field(() => InventoryActivity)
  activityType: InventoryActivity;

  @Prop({ default: new Date() })
  activityDate?: Date;
}

export type InventoryHistoryDocument = InventoryHistory & Document;
export const InventoryHistorySchema =
  SchemaFactory.createForClass(InventoryHistory);
