import {ObjectType, Field, Int, ID} from '@nestjs/graphql';
import {Prop, SchemaFactory} from "@nestjs/mongoose";
import {User} from "../../user/entities/user.entity";
import {Facility} from "../../facility/entities/facility.entity";

@ObjectType()
export class Item {
  @Field(() => ID)
  _id: string;

  @Prop()
  name: string;

  @Prop()
  picture: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop()
  created: User;

  @Prop()
  quantity: number;
}

export const ItemModel = SchemaFactory.createForClass(Facility);
