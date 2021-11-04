import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateItemInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
