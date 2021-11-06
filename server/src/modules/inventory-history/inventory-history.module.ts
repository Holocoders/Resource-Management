import { Module } from '@nestjs/common';
import { InventoryHistoryService } from './inventory-history.service';
import { InventoryHistoryResolver } from './inventory-history.resolver';

@Module({
  providers: [InventoryHistoryResolver, InventoryHistoryService],
})
export class InventoryHistoryModule {}
