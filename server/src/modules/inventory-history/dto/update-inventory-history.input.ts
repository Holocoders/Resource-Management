import { CreateInventoryHistoryInput } from './create-inventory-history.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateInventoryHistoryInput extends PartialType(
  CreateInventoryHistoryInput,
) {}
