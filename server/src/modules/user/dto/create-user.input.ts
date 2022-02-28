import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @IsEmail()
  email: string;

  password: string;

  nodeId?: string; // 0 implies super user, control over all facilities.
}
