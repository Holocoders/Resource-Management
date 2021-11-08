import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateFacilityInput {
  _id?: string;
  name: string;
  description?: string;
}
