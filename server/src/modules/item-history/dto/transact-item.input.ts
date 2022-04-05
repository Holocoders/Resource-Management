import { Field, InputType } from '@nestjs/graphql';
import {
  ItemActivity,
  ItemState,
} from 'src/modules/item-history/entities/item-history.entity';

@InputType()
export class BuyItemInput {
  @Field(() => String)
  item: string;
  @Field(() => String)
  user?: string;
  quantity: number;
  issueDate: Date;
  @Field({ defaultValue: ItemState.ORDERED })
  itemState: ItemState;
  activityType?: ItemActivity;
}

@InputType()
export class RentItemInput extends BuyItemInput {
  dueDate: Date;
}
