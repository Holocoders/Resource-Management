import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard } from '../auth/auth.guard';
import { CurrentUser } from '../../decorators/auth.decorator';
import { GraphQLError } from 'graphql';
import { NodeService } from './node.service';
import { Node } from './entities/node.entity';
import { AuthorizeNode } from '../../decorators/metadata.decorator';

@Resolver()
@UseGuards(JwtAuthGuard, RolesGuard)
export class NodeResolver {
  constructor(private readonly nodeService: NodeService) {}

  @AuthorizeNode('id')
  @Mutation(() => Node, { nullable: true })
  removeNode(
    @CurrentUser() user,
    @Args('id', { type: () => String }) id: string,
  ) {
    if (!user) return new GraphQLError('Unauthorized');
    return this.nodeService.remove(id);
  }
}
