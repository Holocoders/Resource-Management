import {Field, ID, InputType, ObjectType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Schema as MongooseSchema} from 'mongoose';
import {User} from "../../user/entities/user.entity";

export type NodeDocument = Node & Document;

@Schema()
@ObjectType()
export class Node {
  @Field(() => ID)
  _id: string;

  @Prop({ default: null, ref: Node.name, type: MongooseSchema.Types.ObjectId })
  @Field(() => Node, {nullable: true})
  parent?: MongooseSchema.Types.ObjectId | Node;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  @Field(() => User)
  createdBy: MongooseSchema.Types.ObjectId | User;

  @Prop({ default: false })
  isItem: boolean;
}

export const NodeSchema = SchemaFactory.createForClass(Node);
