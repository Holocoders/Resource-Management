import { InputType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@InputType()
export class GetUserInput extends PartialType(CreateUserInput) {
  _id?: string;
}
