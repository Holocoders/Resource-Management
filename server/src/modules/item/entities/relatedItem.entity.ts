import {Field, ID, ObjectType} from "@nestjs/graphql";
import {Prop, SchemaFactory} from "@nestjs/mongoose";
import {ItemFrequency} from "./itemFrequency.entity";
import {Facility} from "../../facility/entities/facility.entity";

@ObjectType()
export class RelatedItem {
  @Field(() => ID)
  _id: number;

  @Prop()
  related: [ItemFrequency];
}

export const RelatedItemModel = SchemaFactory.createForClass(Facility);
