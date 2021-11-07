import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Field, ID, InputType, ObjectType} from '@nestjs/graphql';
import {Document, Schema as MongooseSchema} from 'mongoose';

export type UserDocument = User & Document;

@Schema()
@ObjectType()
@InputType('UserInput')
export class User {
  @Field(() => ID)
  _id: string;

  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  token?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
