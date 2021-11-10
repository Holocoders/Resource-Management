import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InventoryHistoryService } from './inventory-history.service';
import { InventoryHistory } from './entities/inventory-history.entity';
import { CreateInventoryHistoryInput } from './dto/create-inventory-history.input';
import { UpdateInventoryHistoryInput } from './dto/update-inventory-history.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../../decorators/auth.decorator';

@Resolver(() => InventoryHistory)
@UseGuards(JwtAuthGuard)
export class InventoryHistoryResolver {
  constructor(
    private readonly inventoryHistoryService: InventoryHistoryService,
  ) {}

  @Mutation(() => InventoryHistory)
  createInventoryHistory(
    @CurrentUser() user,
    @Args('createInventoryHistoryInput')
    createInventoryHistoryInput: CreateInventoryHistoryInput,
  ) {
    createInventoryHistoryInput.user =
      createInventoryHistoryInput.user || user._id;
    return this.inventoryHistoryService.create(createInventoryHistoryInput);
  }

  @Query(() => [InventoryHistory], { name: 'inventoryHistoryByItem' })
  findInventoryHistoryByItem(
    @Args('item', { type: () => String }) item: string,
  ) {
    return this.inventoryHistoryService.findAll({ item });
  }

  @Query(() => [InventoryHistory], { name: 'inventoryHistoryByUser' })
  findInventoryHistoryByUser(
    @Args('user', { type: () => String }) user: string,
  ) {
    return this.inventoryHistoryService.findAll({ user });
  }

  @Mutation(() => InventoryHistory)
  updateInventoryHistory(
    @Args('updateInventoryHistoryInput')
    updateInventoryHistoryInput: UpdateInventoryHistoryInput,
  ) {
    return this.inventoryHistoryService.update(updateInventoryHistoryInput);
  }
}
