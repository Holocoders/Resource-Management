import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePermissionInput {
  @Field(() => String)
  userId: string;
  @Field(() => String)
  nodeId?: string;

  constructor(userId: string, nodeId: string) {
    this.userId = userId;
    this.nodeId = nodeId;
  }
}
