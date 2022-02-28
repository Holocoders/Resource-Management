import { Field, InputType } from '@nestjs/graphql';
import { ItemActivity, ItemState } from '../entities/item-history.entity';

@InputType()
export class CreateItemHistoryInput {
  @Field(() => String)
  item: string;
  @Field(() => String)
  user?: string;
  quantity: number;
  @Field(() => String, { defaultValue: ItemState.ORDERED })
  itemState: ItemState;
  activityType: ItemActivity;
  issueDate?: Date;
  @Field(() => Date, { defaultValue: null })
  dueDate?: Date;
}
