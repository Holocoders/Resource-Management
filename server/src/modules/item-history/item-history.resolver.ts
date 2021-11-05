import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
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

  @Query(() => [ItemHistory], { name: 'itemActivityHistory' })
  findItemActivityHistory(
    @Args('itemId', {type: () => String}) itemId: string
  ) {
    return this.itemHistoryService.findAll({itemId});
  }

  @Query(() => [ItemHistory], { name: 'userActivityHistory' })
  findUserActivityHistory(
    @Args('userId', {type: () => String}) userId: string
  ) {
    return this.itemHistoryService.findAll({userId});
  }

  @Mutation(() => ItemHistory)
  updateItemHistory(@Args('updateItemHistoryInput') updateItemHistoryInput: UpdateItemHistoryInput) {
    return this.itemHistoryService.update(updateItemHistoryInput);
  }
}
