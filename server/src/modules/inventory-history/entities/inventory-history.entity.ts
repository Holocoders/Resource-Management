import {Field, InputType, ObjectType, registerEnumType} from '@nestjs/graphql';
import {User} from '../../user/entities/user.entity';
import {Prop} from '@nestjs/mongoose';
import {Item} from '../../item/entities/item.entity';
import {Schema as MongooseSchema} from "mongoose";

export enum InventoryActivity {
  ADD,
  REMOVE,
}

registerEnumType(InventoryActivity, {name: 'InventoryActivity'})

@ObjectType()
@InputType('InventoryHistoryType')
export class InventoryHistory {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Item.name})
  @Field(() => Item)
  itemId: MongooseSchema.Types.ObjectId | Item;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  @Field(() => User)
  userId: MongooseSchema.Types.ObjectId | User;

  @Prop()
  quantity: number;

  @Prop()
  activityDate: Date;

  @Prop()
  @Field(() => InventoryActivity)
  activityType: InventoryActivity;
}
