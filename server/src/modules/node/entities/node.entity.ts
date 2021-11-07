import {Field, ID, InputType, ObjectType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Schema as MongooseSchema} from 'mongoose';

export type NodeDocument = Node & Document;

@Schema()
@ObjectType()
@InputType('NodeType')
export class Node {
  @Field(() => ID)
  _id: string;

  @Prop({ default: null, ref: Node.name, type: MongooseSchema.Types.ObjectId })
  parent: MongooseSchema.Types.ObjectId | Node;

  @Prop({ default: false })
  isItem: boolean;
}

export const NodeSchema = SchemaFactory.createForClass(Node);
