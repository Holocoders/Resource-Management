import { CreateItemHistoryInput } from './create-item-history.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateItemHistoryInput extends PartialType(CreateItemHistoryInput) {
  @Field(() => Int)
  id: number;
}
