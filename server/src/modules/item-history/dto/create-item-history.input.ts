import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateItemHistoryInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
