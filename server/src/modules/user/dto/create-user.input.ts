import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNumberString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @IsNumberString()
  phone: string;

  @IsEmail()
  email: string;

  password: string;

  address: string;
}
