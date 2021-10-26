import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateNodeInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
