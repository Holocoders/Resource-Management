import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Node } from '../../node/entities/node.entity';

export type ItemDocument = Item & Document;

export enum AllowedItemActivity {
  BUY = 'BUY',
  RENT = 'RENT',
  BOTH = 'BOTH',
}

registerEnumType(AllowedItemActivity, { name: 'AllowedItemActivity' });

@Schema({})
@ObjectType()
export class Item {
  @Field(() => Node)
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Node.name,
    autopopulate: true,
  })
  _id?: MongooseSchema.Types.ObjectId | Node;

  @Field(() => Node, {
    description:
      'This field is the _id field in the DB. Virtual have been defined for readability.',
  })
  node?: MongooseSchema.Types.ObjectId | Node;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop({ default: '' })
  description?: string;

  @Prop({ default: 0 })
  quantity?: number;

  @Prop({ default: AllowedItemActivity.BOTH })
  @Field(() => AllowedItemActivity)
  allowedItemActivities?: AllowedItemActivity;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

ItemSchema.virtual('node').get(function () {
  return this._id;
});

ItemSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (document, returnValue) => {
    delete returnValue._id;
    delete returnValue.id;
  },
});

ItemSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (document, returnValue) => {
    delete returnValue._id;
    delete returnValue.id;
  },
});

ItemSchema.virtual('node', {
  ref: 'Node',
  localField: '_id',
  foreignField: '_id',
  justOne: true,
});
