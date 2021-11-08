import {Args, createUnionType, Mutation, Query, Resolver} from '@nestjs/graphql';
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/auth.guard";
import {Item} from "../item/entities/item.entity";
import {CurrentUser} from "../../decorators/auth.decorator";
import {GraphQLError} from "graphql";
import {Category} from "../category/entities/category.entity";
import {NodeService} from "./node.service";


export const NodeResult = createUnionType({
  name: 'NodeResult',
  types: () => [Item, Category],
});

@Resolver()
@UseGuards(JwtAuthGuard)
export class NodeResolver {

  constructor(
    private readonly nodeService: NodeService
  ) {}

  @Query(() => [NodeResult], { name: 'children' })
  getAllChildren(
    @CurrentUser() user,
    @Args('id', { type: () => String }) id: string
  ) {
    if (!user) return new GraphQLError("Unauthorized");

  }

  @Mutation(() => Boolean)
  removeNode(
    @CurrentUser() user,
    @Args('id', { type: () => String }) id: string
  ) {
    if (!user) return new GraphQLError("Unauthorized");
    return this.nodeService.remove(id);
  }
}
