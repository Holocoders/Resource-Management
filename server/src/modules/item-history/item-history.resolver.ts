import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ItemHistoryService } from './item-history.service';
import { ItemHistory } from './entities/item-history.entity';
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
  findItemHistoryByUser(@Args('user', { type: () => String }) user: string) {
    return this.itemHistoryService.findAll({ user });
  }

  @Query(() => Int, { name: 'itemAvailability' })
  findItemAvailability(
    @Args('item', { type: () => String }) item: string,
    @Args('issueDate', { type: () => String }) issueDate: string,
    @Args('dueDate', { type: () => String }) dueDate: string,
  ) {
    return this.itemHistoryService.findItemAvailability(
      item,
      new Date(issueDate),
      new Date(dueDate),
    );
  }

  @Mutation(() => ItemHistory)
  updateItemHistory(
    @Args('updateItemHistoryInput')
    updateItemHistoryInput: UpdateItemHistoryInput,
  ) {
    return this.itemHistoryService.update(updateItemHistoryInput);
  }
}
