import {Field, InputType, ObjectType} from '@nestjs/graphql';
import {User} from "../../user/entities/user.entity";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Item} from "../../item/entities/item.entity";
import {Document, Schema as MongooseSchema} from "mongoose";


export type ItemHistoryDocument = ItemHistory & Document;

export enum ItemActivity {
  BUY,
  RENT
}

@Schema()
@ObjectType()
@InputType('ItemHistoryType')
export class ItemHistory {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Item.name })
  @Field(() => Item)
  itemId: MongooseSchema.Types.ObjectId | Item;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  @Field(() => User)
  userId: MongooseSchema.Types.ObjectId | User;

  @Prop({default: 1})
  quantity: number;

  @Prop({default: new Date()})
  currentDate?: Date;

  @Prop()
  cancelled: boolean;

  @Prop()
  issued: boolean;

  @Prop()
  status: boolean;

  @Prop({default: new Date()})
  issueDate?: Date;

  @Prop({default: new Date()})
  dueDate?: Date;
}

export const ItemHistorySchema = SchemaFactory.createForClass(ItemHistory);
