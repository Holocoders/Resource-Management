import {ObjectType, Field, Int, ID} from '@nestjs/graphql';
import {Prop} from "@nestjs/mongoose";

@ObjectType()
export class Category {
  @Field(() => ID)
  _id: string;

  @Prop()
  name: string;

  @Prop()
  picture: string;
}
