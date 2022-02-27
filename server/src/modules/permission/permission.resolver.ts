import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PermissionService } from './permission.service';
import { CreatePermissionInput } from './dto/create-permission.input';

@Resolver()
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Mutation(() => String)
  async createPermission(
    @Args('createPermissionInput') createPermissionInput: CreatePermissionInput,
  ) {
    return this.permissionService.create(
      createPermissionInput.userId,
      createPermissionInput.nodeId,
    );
  }
}
