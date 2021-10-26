import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import {Prop, SchemaFactory} from "@nestjs/mongoose";

@ObjectType()
export class Facility {
  @Field(() => ID)
  _id: number;

  @Prop()
  name: string;

  @Prop()
  picture: string;
}

export const FacilityModel = SchemaFactory.createForClass(Facility);
