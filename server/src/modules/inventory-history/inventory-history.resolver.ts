import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {InventoryHistoryService} from './inventory-history.service';
import {InventoryHistory} from './entities/inventory-history.entity';
import {CreateInventoryHistoryInput} from './dto/create-inventory-history.input';
import {UpdateInventoryHistoryInput} from './dto/update-inventory-history.input';
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/auth.guard";
import {CurrentUser} from "../../decorators/auth.decorator";

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
    createInventoryHistoryInput.userId = createInventoryHistoryInput.userId || user._id;
    return this.inventoryHistoryService.create(createInventoryHistoryInput);
  }

  @Query(() => [InventoryHistory], { name: 'inventoryHistory' })
  findAll() {
    return this.inventoryHistoryService.findAll();
  }

  @Query(() => InventoryHistory, { name: 'inventoryHistory' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.inventoryHistoryService.findOne(id);
  }

  @Mutation(() => InventoryHistory)
  updateInventoryHistory(
    @Args('updateInventoryHistoryInput')
    updateInventoryHistoryInput: UpdateInventoryHistoryInput,
  ) {
    return this.inventoryHistoryService.update(updateInventoryHistoryInput);
  }
}
