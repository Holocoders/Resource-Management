import {Field, ID, InputType, ObjectType} from "@nestjs/graphql";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {ItemFrequency} from "./itemFrequency.entity";
import {Schema as MongooseSchema} from "mongoose";

@Schema()
@ObjectType()
@InputType('RelatedItemType')
export class RelatedItem {
  @Field(() => ID)
  _id: string;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: ItemFrequency.name})
  related: MongooseSchema.Types.ObjectId[] | ItemFrequency[];
}

export const RelatedItemSchema = SchemaFactory.createForClass(RelatedItem);
