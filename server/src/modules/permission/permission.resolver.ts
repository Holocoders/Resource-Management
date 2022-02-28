import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PermissionService } from './permission.service';
import { CreatePermissionInput } from './dto/create-permission.input';
import { Facility } from '../facility/entities/facility.entity';
import { Permission } from './entities/permission.entity';

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

  @Query(() => [Permission], { name: 'getUsersWithPermission' })
  getUsersWithPermission(
    @Args('nodeId', { type: () => String, description: 'Node ID' })
    nodeId: string,
  ) {
    return this.permissionService.findAll(nodeId);
  }
}
