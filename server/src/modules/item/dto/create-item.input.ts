import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateItemInput {
  @Field(() => String)
  _id?: string;
  name: string;
  price: number;
  description?: string;
  quantity?: number;
  parent: string;
  allowedItemActivities: string;
}
