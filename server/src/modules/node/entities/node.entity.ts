import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../user/entities/user.entity';

export type NodeDocument = Node & Document;

export enum NodeType {
  CATEGORY = 'CATEGORY',
  ITEM = 'ITEM',
  PACK = 'PACK',
  FACILITY = 'FACILITY',
}

registerEnumType(NodeType, { name: 'NodeType' });

@Schema()
@ObjectType()
export class Node {
  @Field(() => ID)
  _id: string;

  @Prop({ default: null, ref: Node.name, type: MongooseSchema.Types.ObjectId })
  @Field(() => Node, { nullable: true })
  parent?: MongooseSchema.Types.ObjectId | Node;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    autopopulate: true,
  })
  @Field(() => User)
  createdBy: MongooseSchema.Types.ObjectId | User;

  @Prop({ default: 0 })
  categoryCount: number;

  @Prop({ default: 0 })
  itemCount: number;

  @Prop({ default: 0 })
  packCount: number;

  @Field(() => NodeType)
  @Prop({ required: true })
  type: NodeType;
}

export const NodeSchema = SchemaFactory.createForClass(Node);
