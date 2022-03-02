import { SetMetadata } from '@nestjs/common';

export const AuthorizeNode = (argumentName) =>
  SetMetadata('argumentName', argumentName);
