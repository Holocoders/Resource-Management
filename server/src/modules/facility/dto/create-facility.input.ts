import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFacilityInput {
  @Field(() => String)
  name: string;
}
