import {Field, ID, InputType, ObjectType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {User} from '../../user/entities/user.entity';
import {Document, Schema as MongooseSchema} from 'mongoose';
import {Node} from "../../node/entities/node.entity";
import {Exclude} from "class-transformer";

export type ItemDocument = Item & Document;

@Schema()
@ObjectType()
@InputType('ItemType')
export class Item {

  @Field(() => Node)
  @Exclude()
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Node.name })
  _id: MongooseSchema.Types.ObjectId | Node;

  @Field(() => Node)
  node?: MongooseSchema.Types.ObjectId | Node;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop({default: ""})
  description?: string;

  @Prop({default: 0})
  quantity?: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

ItemSchema.virtual('node').get(function () {
  return this._id;
})

ItemSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: ((doc, ret) => {
    delete ret._id;
    delete ret.id;
  })
})

ItemSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: ((doc, ret) => {
    delete ret._id;
    delete ret.id;
  })
})

ItemSchema.virtual('node', {
  ref: 'Node',
  localField: '_id',
  foreignField: '_id',
  justOne: true
})
