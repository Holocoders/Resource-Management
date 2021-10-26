import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateInventoryHistoryInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
