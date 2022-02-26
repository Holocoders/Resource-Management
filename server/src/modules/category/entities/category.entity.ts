import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Node } from '../../node/entities/node.entity';

export type CategoryDocument = Category & Document;

@Schema()
@ObjectType()
export class Category {
  @Field(() => Node)
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Node.name,
    autopopulate: true,
  })
  _id?: MongooseSchema.Types.ObjectId | Node;

  @Field(() => Node, {
    description:
      'This field is the _id field in the DB. Virtuals have been defined for readability.',
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
});

CategorySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (document, returnValue) => {
    delete returnValue._id;
    delete returnValue.id;
  },
});

CategorySchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (document, returnValue) => {
    delete returnValue._id;
    delete returnValue.id;
  },
});

CategorySchema.virtual('node', {
  ref: 'Node',
  localField: '_id',
  foreignField: '_id',
  justOne: true,
});
