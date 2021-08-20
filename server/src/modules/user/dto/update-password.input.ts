import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePasswordInput {
  _id: string;
  oldPassword: string;
  newPassword: string;
}
