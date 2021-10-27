import {ObjectType, Field, ID} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document, Schema as MongooseSchema} from "mongoose";

export type NodeDocument = Node & Document;

@Schema()
@ObjectType()
export class Node {
  @Field(() => ID)
  _id: string;

  @Prop({default: null, ref: 'Node', type: MongooseSchema.Types.ObjectId})
  parent: string;

  @Prop({default: false})
  isItem: boolean;
}

export const NodeSchema = SchemaFactory.createForClass(Node);
