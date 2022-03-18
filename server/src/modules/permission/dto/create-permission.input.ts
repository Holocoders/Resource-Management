import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePermissionInput {
  @Field(() => String)
  email: string;
  @Field(() => String)
  userId?: string;
  @Field(() => String)
  nodeId?: string;

  constructor(email: string, nodeId: string, userId = '') {
    this.email = email;
    this.nodeId = nodeId;
    this.userId = userId;
  }
}
