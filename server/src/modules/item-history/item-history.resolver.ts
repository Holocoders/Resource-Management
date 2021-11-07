import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {ItemHistoryService} from './item-history.service';
import {ItemHistory} from './entities/item-history.entity';
import {CreateItemHistoryInput} from './dto/create-item-history.input';
import {UpdateItemHistoryInput} from './dto/update-item-history.input';
import {CurrentUser} from "../../decorators/auth.decorator";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/auth.guard";

@Resolver(() => ItemHistory)
@UseGuards(JwtAuthGuard)
export class ItemHistoryResolver {
  constructor(private readonly itemHistoryService: ItemHistoryService) {}

  @Mutation(() => ItemHistory)
  createItemHistory(
    @CurrentUser() user,
    @Args('createItemHistoryInput') createItemHistoryInput: CreateItemHistoryInput,
  ) {
    createItemHistoryInput.userId = createItemHistoryInput.userId || user._id;
    return this.itemHistoryService.create(createItemHistoryInput);
  }

  @Query(() => [ItemHistory], { name: 'itemActivityHistory' })
  findItemActivityHistory(
    @Args('itemId', { type: () => String }) itemId: string,
  ) {
    return this.itemHistoryService.findAll({ itemId });
  }

  @Query(() => [ItemHistory], { name: 'userActivityHistory' })
  findUserActivityHistory(
    @Args('userId', { type: () => String }) userId: string,
  ) {
    return this.itemHistoryService.findAll({ userId });
  }

  @Mutation(() => ItemHistory)
  updateItemHistory(
    @Args('updateItemHistoryInput')
    updateItemHistoryInput: UpdateItemHistoryInput,
  ) {
    return this.itemHistoryService.update(updateItemHistoryInput);
  }
}
