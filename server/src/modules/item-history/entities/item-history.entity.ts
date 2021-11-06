import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Item } from '../../item/entities/item.entity';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ItemHistoryDocument = ItemHistory & Document;

export enum ItemActivity {
  BUY,
  RENT,
}

@Schema()
@ObjectType()
export class ItemHistory {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Item' })
  itemId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: string;

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

export const ItemHistorySchema = SchemaFactory.createForClass(ItemHistory);
