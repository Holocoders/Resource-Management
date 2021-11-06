import {InputType} from '@nestjs/graphql';

@InputType()
export class CreateItemInput {
  _id?: string;
  name: string;
  parent: string;
  picture?: string;
}
