import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const headers = req.headers;
    const token = headers['authorization'].replace('Bearer ', '');
    try {
      req.user = this.jwtService.verify(token) as {
        _id: string;
        email: string;
      };
      return true;
    } catch {
      Logger.error('Invalid token received');
      return false;
    }
  }
}
