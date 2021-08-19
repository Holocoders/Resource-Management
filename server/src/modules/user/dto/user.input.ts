import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsEmail, IsNumberString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @IsNumberString()
  phone: string;

  @IsEmail()
  email: string;
}

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  _id: string;
}
