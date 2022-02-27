import { Resolver } from '@nestjs/graphql';
import { PermissionService } from './permission.service';

@Resolver()
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}
}
