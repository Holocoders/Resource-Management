import { Field, InputType } from '@nestjs/graphql';

@InputType()
class PackItemInput {
  @Field(() => String)
  item: string;
  quantity: number;
}

@InputType()
export class CreateItemInput {
  @Field(() => String)
  _id?: string;
  name: string;
  price: number;
  description?: string;
  quantity?: number;
  parent: string;
  @Field(() => [PackItemInput])
  packItems?: PackItemInput[];
  allowedItemActivities: string;
}
