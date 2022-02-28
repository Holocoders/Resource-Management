import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType } from '@nestjs/graphql';
import { Document } from 'mongoose';

export type PermissionDocument = Permission & Document;

@Schema()
@ObjectType()
export class Permission {
  @Prop()
  userId: string;

  @Prop()
  nodeId: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
