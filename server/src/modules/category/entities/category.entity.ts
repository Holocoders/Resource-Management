import {ObjectType, Field, Int, ID} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document, Schema as MongooseSchema} from "mongoose";

export type CategoryDocument = Category & Document;

@Schema()
@ObjectType()
export class Category {
  @Field(() => ID)
  @Prop({ ref: 'Node', type: MongooseSchema.Types.ObjectId })
  _id: string;

  @Prop()
  name: string;

  @Prop({ required: false })
  image?: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
