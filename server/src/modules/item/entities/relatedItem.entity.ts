import {Field, ID, ObjectType} from "@nestjs/graphql";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {ItemFrequency} from "./itemFrequency.entity";
import {Schema as MongooseSchema} from "mongoose";

@Schema()
@ObjectType()
export class RelatedItem {
  @Field(() => ID)
  @Prop({ type: MongooseSchema.Types.ObjectId })
  _id: string;

  @Prop()
  related: [ItemFrequency];
}

export const RelatedItemSchema = SchemaFactory.createForClass(RelatedItem);
