import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../user/entities/user.entity';
import { Node } from '../../node/entities/node.entity';

export type CategoryDocument = Category & Document;

@Schema()
@ObjectType()
@InputType('CategoryType')
export class Category {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Node.name })
  @Field(() => Node)
  _id: MongooseSchema.Types.ObjectId | Node;

  @Prop()
  name: string;

  @Prop({ default: '' })
  description?: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
