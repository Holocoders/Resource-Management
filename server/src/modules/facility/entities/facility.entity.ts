import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Node } from '../../node/entities/node.entity';

@Schema()
@ObjectType()
export class Facility {
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

export type FacilityDocument = Facility & Document;
export const FacilitySchema = SchemaFactory.createForClass(Facility);

FacilitySchema.virtual('node').get(function () {
  return this._id;
});

FacilitySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (document, returnValue) => {
    delete returnValue._id;
    delete returnValue.id;
  },
});

FacilitySchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  transform: (document, returnValue) => {
    delete returnValue._id;
    delete returnValue.id;
  },
});

FacilitySchema.virtual('node', {
  ref: 'Node',
  localField: '_id',
  foreignField: '_id',
  justOne: true,
});
