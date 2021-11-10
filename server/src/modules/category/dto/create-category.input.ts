import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  _id?: string;
  name: string;
  parent: string;
  description?: string;
}
