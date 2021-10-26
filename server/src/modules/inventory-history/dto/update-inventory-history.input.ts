import { CreateInventoryHistoryInput } from './create-inventory-history.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateInventoryHistoryInput extends PartialType(CreateInventoryHistoryInput) {
  @Field(() => Int)
  id: number;
}
