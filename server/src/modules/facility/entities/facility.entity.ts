import { ObjectType, Field, ID } from '@nestjs/graphql';
import {Prop, Schema , SchemaFactory} from "@nestjs/mongoose";
import { Document } from 'mongoose';
import * as mongoose from "mongoose";


@Schema()
@ObjectType()
export class Facility {
  @Field(() => ID)
  @Prop({type: mongoose.Schema.Types.ObjectId})
  _id: string;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String, { nullable: true })
  @Prop()
  picture?: string;
}

export type FacilityDocument = Facility & Document;
export const FacilitySchema = SchemaFactory.createForClass(Facility);
