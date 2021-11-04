import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateItemHistoryInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
