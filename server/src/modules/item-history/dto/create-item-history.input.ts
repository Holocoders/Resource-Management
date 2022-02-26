import { Field, InputType } from '@nestjs/graphql';
import { ItemActivity } from '../entities/item-history.entity';

@InputType()
export class CreateItemHistoryInput {
  @Field(() => String)
  item: string;
  @Field(() => String)
  user?: string;
  quantity: number;
  @Field(() => Boolean, { defaultValue: false })
  cancelled: boolean;
  @Field(() => Boolean, { defaultValue: false })
  issued: boolean;
  activityType: ItemActivity;
  issueDate?: Date;
  @Field(() => Date, { defaultValue: null })
  dueDate?: Date;
}
