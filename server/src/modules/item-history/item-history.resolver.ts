import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ItemHistoryService } from './item-history.service';
import { ItemActivity, ItemHistory } from './entities/item-history.entity';
import { CreateItemHistoryInput } from './dto/create-item-history.input';
import { UpdateItemHistoryInput } from './dto/update-item-history.input';
import { CurrentUser } from '../../decorators/auth.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';

@Resolver(() => ItemHistory)
@UseGuards(JwtAuthGuard)
export class ItemHistoryResolver {
  constructor(private readonly itemHistoryService: ItemHistoryService) {}

  @Mutation(() => ItemHistory)
  createItemHistory(
    @CurrentUser() user,
    @Args('createItemHistoryInput')
    createItemHistoryInput: CreateItemHistoryInput,
  ) {
    createItemHistoryInput.user = createItemHistoryInput.user || user._id;
    return this.itemHistoryService.create(createItemHistoryInput);
  }

  @Query(() => [ItemHistory], { name: 'itemHistory' })
  findItemHistory() {
    return this.itemHistoryService.findAll();
  }

  @Query(() => [ItemHistory], { name: 'itemHistoryByItem' })
  findItemHistoryByItem(@Args('item', { type: () => String }) item: string) {
    return this.itemHistoryService.findAll({ item });
  }

  @Query(() => [ItemHistory], { name: 'itemHistoryByUser' })
  findItemHistoryByUser(@CurrentUser() user) {
    return this.itemHistoryService.findAll({ user: user._id });
  }

  @Query(() => Int, { name: 'itemAvailability' })
  findItemAvailability(
    @Args('item', { type: () => String }) item: string,
    @Args('activityType', { type: () => ItemActivity })
    activityType: ItemActivity,
    @Args('issueDate', { type: () => String }) issueDate: string,
    @Args('dueDate', { type: () => String }) dueDate: string,
  ) {
    return this.itemHistoryService.findItemAvailability(
      item,
      activityType,
      new Date(issueDate),
      new Date(dueDate),
    );
  }

  @Mutation(() => ItemHistory)
  updateItemHistory(
    @Args('updateItemHistoryInput')
    updateItemHistoryInput: UpdateItemHistoryInput,
    @CurrentUser() user,
  ) {
    updateItemHistoryInput.user = updateItemHistoryInput.user || user._id;
    return this.itemHistoryService.update(updateItemHistoryInput);
  }
}
