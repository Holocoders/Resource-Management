import {Field, InputType, ObjectType, registerEnumType} from '@nestjs/graphql';
import {User} from "../../user/entities/user.entity";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Item} from "../../item/entities/item.entity";
import {Document, Schema as MongooseSchema} from "mongoose";


export enum ItemActivity {
  BUY,
  RENT
}

registerEnumType(ItemActivity, {name: 'ItemActivity'})

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
  activityDate?: Date;

  @Prop()
  cancelled: boolean;

  @Prop()
  issued: boolean;

  @Prop()
  @Field(() => ItemActivity)
  activityType: ItemActivity;

  @Prop({default: new Date()})
  issueDate?: Date;

  @Prop({default: new Date()})
  dueDate?: Date;
}

export type ItemHistoryDocument = ItemHistory & Document;
export const ItemHistorySchema = SchemaFactory.createForClass(ItemHistory);
