import {Field, InputType} from '@nestjs/graphql';
import {ItemActivity} from "../entities/item-history.entity";

@InputType()
export class CreateItemHistoryInput {
  @Field(() => String)
  item: string;
  @Field(() => String)
  user?: string;
  quantity: number;
  cancelled: boolean;
  issued: boolean;
  activityType: ItemActivity;
  issueDate?: Date;
  dueDate?: Date;
}
