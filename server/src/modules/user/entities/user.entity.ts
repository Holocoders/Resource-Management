import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  address: string;
}

export const UserModel = SchemaFactory.createForClass(User);
