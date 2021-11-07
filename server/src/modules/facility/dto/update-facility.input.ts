import {CreateFacilityInput} from './create-facility.input';
import {Field, InputType, PartialType} from '@nestjs/graphql';

@InputType()
export class UpdateFacilityInput extends PartialType(CreateFacilityInput) {
  @Field(() => String)
  _id: string;
}
