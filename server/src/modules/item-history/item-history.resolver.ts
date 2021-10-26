import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ItemHistoryService } from './item-history.service';
import { ItemHistory } from './entities/item-history.entity';
import { CreateItemHistoryInput } from './dto/create-item-history.input';
import { UpdateItemHistoryInput } from './dto/update-item-history.input';

@Resolver(() => ItemHistory)
export class ItemHistoryResolver {
  constructor(private readonly itemHistoryService: ItemHistoryService) {}

  @Mutation(() => ItemHistory)
  createItemHistory(@Args('createItemHistoryInput') createItemHistoryInput: CreateItemHistoryInput) {
    return this.itemHistoryService.create(createItemHistoryInput);
  }

  @Query(() => [ItemHistory], { name: 'itemHistory' })
  findAll() {
    return this.itemHistoryService.findAll();
  }

  @Query(() => ItemHistory, { name: 'itemHistory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.itemHistoryService.findOne(id);
  }

  @Mutation(() => ItemHistory)
  updateItemHistory(@Args('updateItemHistoryInput') updateItemHistoryInput: UpdateItemHistoryInput) {
    return this.itemHistoryService.update(updateItemHistoryInput.id, updateItemHistoryInput);
  }

  @Mutation(() => ItemHistory)
  removeItemHistory(@Args('id', { type: () => Int }) id: number) {
    return this.itemHistoryService.remove(id);
  }
}
