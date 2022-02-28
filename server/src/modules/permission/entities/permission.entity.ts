import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../user/entities/user.entity';
import { Node } from '../../node/entities/node.entity';

export type PermissionDocument = Permission & Document;

@Schema()
@ObjectType()
export class Permission {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    autopopulate: true,
  })
  @Field(() => User)
  userId: MongooseSchema.Types.ObjectId | User;

  @Prop({
    ref: Node.name,
  })
  nodeId: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
