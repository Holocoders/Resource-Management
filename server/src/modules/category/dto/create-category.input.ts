import {InputType, Field, ID} from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  _id?: string;
  name: string;
  parent: string;
  picture?: string;
}
