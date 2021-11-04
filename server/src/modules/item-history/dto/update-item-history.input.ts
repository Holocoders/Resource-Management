import { CreateItemHistoryInput } from './create-item-history.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateItemHistoryInput extends PartialType(CreateItemHistoryInput) {
  @Field(() => Int)
  id: number;
}
