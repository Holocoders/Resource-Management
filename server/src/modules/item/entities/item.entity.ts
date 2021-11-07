import {Field, ID, InputType, ObjectType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {User} from '../../user/entities/user.entity';
import {Document, Schema as MongooseSchema} from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
@ObjectType()
@InputType('ItemType')
export class Item {
  @Field(() => ID)
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Node.name })
  _id: string;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop({default: ""})
  description?: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  @Field(() => User)
  createdBy: MongooseSchema.Types.ObjectId | User;

  @Prop({default: 0})
  quantity?: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
