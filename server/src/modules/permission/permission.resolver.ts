import { Args, Resolver } from '@nestjs/graphql';
import { PermissionService } from './permission.service';
import { CreatePermissionInput } from './dto/create-permission.input';

@Resolver()
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  async createPermission(
    @Args('createFacilityInput') createPermissionInput: CreatePermissionInput,
  ) {
    return this.permissionService.create(
      createPermissionInput.userId,
      createPermissionInput.nodeId,
    );
  }
}
