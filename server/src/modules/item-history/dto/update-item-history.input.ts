import { CreateItemHistoryInput } from './create-item-history.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateItemHistoryInput extends PartialType(
  CreateItemHistoryInput,
) {}
