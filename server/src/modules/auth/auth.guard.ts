import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { PermissionService } from '../permission/permission.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const context_ = GqlExecutionContext.create(context);
    return context_.getContext().req;
  }
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionService: PermissionService,
  ) {}

  getRequest(context: ExecutionContext) {
    const context_ = GqlExecutionContext.create(context);
    return context_.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = this.getRequest(context);
    const user = request.user;
    return this.permissionService.isAdmin(user._id, request.headers['nodeid']);
  }
}
