import {Field, ID, InputType, ObjectType} from "@nestjs/graphql";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema()
@ObjectType()
export class ItemFrequency {
  @Field(() => ID)
  _id: string;

  @Prop()
  frequency: number;
}

export const ItemFrequencySchema = SchemaFactory.createForClass(ItemFrequency);
