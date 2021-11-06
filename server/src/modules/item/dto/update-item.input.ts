import { CreateItemInput } from './create-item.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field(() => String)
  id: string;
}
