import {Field, ID, InputType, ObjectType} from '@nestjs/graphql';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {User} from '../../user/entities/user.entity';
import {Document, Schema as MongooseSchema} from 'mongoose';
import {Node} from "../../node/entities/node.entity";

export type ItemDocument = Item & Document;

@Schema()
@ObjectType()
@InputType('ItemType')
export class Item {

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Node.name })
  @Field(() => Node)
  _id: MongooseSchema.Types.ObjectId | Node;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop({default: ""})
  description?: string;

  @Prop({default: 0})
  quantity?: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
