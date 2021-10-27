import { CreateFacilityInput } from './create-facility.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFacilityInput extends PartialType(CreateFacilityInput) {
  @Field(() => String)
  _id: string;
}
