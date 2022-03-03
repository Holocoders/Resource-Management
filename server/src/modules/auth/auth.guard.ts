import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { PermissionService } from '../permission/permission.service';
import * as lodash from 'lodash';

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
    const argumentName = this.reflector.get<string>(
      'argumentName',
      context.getHandler(),
    );
    if (!argumentName) {
      return true;
    }
    const contextArguments = context.getArgs();
    const request = this.getRequest(context);
    const nodeId = lodash.get(
      contextArguments[contextArguments.length - 1]['variableValues'],
      argumentName,
    );
    const user = request.user;
    return this.permissionService.isAdmin(user._id, nodeId);
  }
}
