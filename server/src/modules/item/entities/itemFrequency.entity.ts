import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Facility } from "../../facility/entities/facility.entity";

@ObjectType()
export class ItemFrequency {
  @Field(() => ID)
  _id: number;

  @Prop()
  frequency: number;
}

export const ItemFrequencyModel = SchemaFactory.createForClass(Facility);
