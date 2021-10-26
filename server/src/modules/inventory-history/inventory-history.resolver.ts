import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InventoryHistoryService } from './inventory-history.service';
import { InventoryHistory } from './entities/inventory-history.entity';
import { CreateInventoryHistoryInput } from './dto/create-inventory-history.input';
import { UpdateInventoryHistoryInput } from './dto/update-inventory-history.input';

@Resolver(() => InventoryHistory)
export class InventoryHistoryResolver {
  constructor(private readonly inventoryHistoryService: InventoryHistoryService) {}

  @Mutation(() => InventoryHistory)
  createInventoryHistory(@Args('createInventoryHistoryInput') createInventoryHistoryInput: CreateInventoryHistoryInput) {
    return this.inventoryHistoryService.create(createInventoryHistoryInput);
  }

  @Query(() => [InventoryHistory], { name: 'inventoryHistory' })
  findAll() {
    return this.inventoryHistoryService.findAll();
  }

  @Query(() => InventoryHistory, { name: 'inventoryHistory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.inventoryHistoryService.findOne(id);
  }

  @Mutation(() => InventoryHistory)
  updateInventoryHistory(@Args('updateInventoryHistoryInput') updateInventoryHistoryInput: UpdateInventoryHistoryInput) {
    return this.inventoryHistoryService.update(updateInventoryHistoryInput.id, updateInventoryHistoryInput);
  }

  @Mutation(() => InventoryHistory)
  removeInventoryHistory(@Args('id', { type: () => Int }) id: number) {
    return this.inventoryHistoryService.remove(id);
  }
}
