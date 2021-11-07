import {Field, InputType} from '@nestjs/graphql';
import {ItemActivity} from "../entities/item-history.entity";

@InputType()
export class CreateItemHistoryInput {
  @Field(() => String)
  itemId: string;
  @Field(() => String)
  userId?: string;
  quantity: number;
  cancelled: boolean;
  issued: boolean;
  activityType: ItemActivity;
  issueDate?: Date;
  dueDate?: Date;
}
