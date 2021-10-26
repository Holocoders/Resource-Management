import {ObjectType, Field, Int, ID} from '@nestjs/graphql';
import {Prop, SchemaFactory} from "@nestjs/mongoose";
import {User} from "../../user/entities/user.entity";

@ObjectType()
export class Node {
  @Field(() => ID)
  _id: string;

  @Prop()
  parent: Node;

  @Prop()
  isItem: boolean;
}

export const NodeModel = SchemaFactory.createForClass(Node);
