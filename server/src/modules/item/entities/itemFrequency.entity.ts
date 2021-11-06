import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
@ObjectType()
export class ItemFrequency {
  @Field(() => ID)
  @Prop({ type: MongooseSchema.Types.ObjectId })
  _id: string;

  @Prop()
  frequency: number;
}

export const ItemFrequencySchema = SchemaFactory.createForClass(ItemFrequency);
