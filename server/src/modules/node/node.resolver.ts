import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NodeService } from './node.service';
import { Node } from './entities/node.entity';
import { CreateNodeInput } from './dto/create-node.input';
import { UpdateNodeInput } from './dto/update-node.input';

@Resolver(() => Node)
export class NodeResolver {
  constructor(private readonly nodeService: NodeService) {}

  @Mutation(() => Node)
  createNode(@Args('createNodeInput') createNodeInput: CreateNodeInput) {
    return this.nodeService.create(createNodeInput);
  }

  @Query(() => [Node], { name: 'node' })
  findAll() {
    return this.nodeService.findAll();
  }

  @Query(() => Node, { name: 'node' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.nodeService.findOne(id);
  }

  @Mutation(() => Node)
  updateNode(@Args('updateNodeInput') updateNodeInput: UpdateNodeInput) {
    return this.nodeService.update(updateNodeInput.id, updateNodeInput);
  }

  @Mutation(() => Node)
  removeNode(@Args('id', { type: () => Int }) id: number) {
    return this.nodeService.remove(id);
  }
}
