import { ObjectType, Field, ID } from '@nestjs/graphql';
import {Prop, Schema , SchemaFactory} from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
@ObjectType()
export class Facility {
  @Field(() => ID)
  @Prop({type: MongooseSchema.Types.ObjectId, ref: 'Node'})
  _id: string;

  @Prop()
  name: string;

  @Prop({required: false})
  picture?: string;
}

export type FacilityDocument = Facility & Document;
export const FacilitySchema = SchemaFactory.createForClass(Facility);
