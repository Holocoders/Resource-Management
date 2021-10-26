import { CreateNodeInput } from './create-node.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNodeInput extends PartialType(CreateNodeInput) {
  @Field(() => Int)
  id: number;
}
