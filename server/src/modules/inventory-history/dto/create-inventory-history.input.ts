import {Field, InputType} from '@nestjs/graphql';
import {InventoryActivity} from "../entities/inventory-history.entity";

@InputType()
export class CreateInventoryHistoryInput {
  @Field(() => String)
  item: string;
  @Field(() => String)
  user?: string;
  quantity: number;
  activityType: InventoryActivity;
}
