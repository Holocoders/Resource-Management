import {CreateInventoryHistoryInput} from './create-inventory-history.input';
import {Field, InputType, PartialType} from '@nestjs/graphql';

@InputType()
export class UpdateInventoryHistoryInput extends PartialType(
  CreateInventoryHistoryInput,
) {}
