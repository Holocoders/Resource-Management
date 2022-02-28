import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';
import { User } from '../../user/entities/user.entity';
import { Node } from '../../node/entities/node.entity';

export type PermissionDocument = Permission & Document;

@Schema()
@ObjectType()
export class Permission {
  @Prop({
    ref: User.name,
    // autopopulate: true,
  })
  userId: string;

  @Prop({
    ref: Node.name,
  })
  nodeId: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
