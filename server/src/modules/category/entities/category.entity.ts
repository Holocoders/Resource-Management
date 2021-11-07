import {Field, ID, InputType, ObjectType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Schema as MongooseSchema} from 'mongoose';
import {User} from "../../user/entities/user.entity";

export type CategoryDocument = Category & Document;

@Schema()
@ObjectType()
@InputType('CategoryType')
export class Category {
  @Field(() => ID)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Node' })
  _id: string;

  @Prop()
  name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  createdBy: User;

  @Prop({default: ""})
  description?: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
