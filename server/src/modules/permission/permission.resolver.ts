import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PermissionService } from './permission.service';
import { CreatePermissionInput } from './dto/create-permission.input';
import { Permission } from './entities/permission.entity';

@Resolver()
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Mutation(() => String)
  async addPermission(
    @Args('createPermissionInput') createPermissionInput: CreatePermissionInput,
  ) {
    return this.permissionService.create(
      createPermissionInput.email,
      createPermissionInput.nodeId,
    );
  }

  @Query(() => [Permission], { name: 'getUsersWithPermission' })
  getUsersWithPermission(
    @Args('nodeId', { type: () => String, description: 'Node ID' })
    nodeId: string,
  ) {
    return this.permissionService.findAll(nodeId);
  }

  @Query(() => [Boolean], { name: 'checkPermission' })
  checkPermission(
    @Args('userId', { type: () => String, description: 'User ID' })
    userId: string,
    @Args('nodeId', { type: () => String, description: 'Node ID' })
    nodeId: string,
  ) {
    return (
      this.permissionService.isSuperAdmin(userId) ||
      this.permissionService.isAdmin(userId, nodeId)
    );
  }
}
