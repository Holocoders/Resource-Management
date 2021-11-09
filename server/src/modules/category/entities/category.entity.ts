import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../user/entities/user.entity';
import { Node } from '../../node/entities/node.entity';
import {ItemSchema} from "../../item/entities/item.entity";

export type CategoryDocument = Category & Document;

@Schema()
@ObjectType()
export class Category {

  @Field(() => Node, {
    description: "This field is the _id field in the DB. Virtuals have been defined for readability."
  })
  node?: MongooseSchema.Types.ObjectId | Node;

  @Prop()
  name: string;

  @Prop({ default: '' })
  description?: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.virtual('node').get(function () {
  return this._id;
})

CategorySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: ((doc, ret) => {
    delete ret._id;
    delete ret.id;
  })
})

CategorySchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: ((doc, ret) => {
    delete ret._id;
    delete ret.id;
  })
})

CategorySchema.virtual('node', {
  ref: 'Node',
  localField: '_id',
  foreignField: '_id',
  justOne: true
})
