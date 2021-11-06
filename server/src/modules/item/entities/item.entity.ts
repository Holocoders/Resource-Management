import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../user/entities/user.entity';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
@ObjectType()
export class Item {
  @Field(() => ID)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Node' })
  _id: string;

  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop()
  createdBy: User;

  @Prop()
  quantity: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
