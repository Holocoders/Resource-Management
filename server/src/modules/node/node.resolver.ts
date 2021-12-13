import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../../decorators/auth.decorator';
import { GraphQLError } from 'graphql';
import { NodeService } from './node.service';
import { Node } from './entities/node.entity';

@Resolver()
@UseGuards(JwtAuthGuard)
export class NodeResolver {
  constructor(private readonly nodeService: NodeService) {}

  @Mutation(() => Node, { nullable: true })
  removeNode(
    @CurrentUser() user,
    @Args('id', { type: () => String }) id: string,
  ) {
    if (!user) return new GraphQLError('Unauthorized');
    return this.nodeService.remove(id);
  }
}
