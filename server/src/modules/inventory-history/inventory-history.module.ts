import { Module } from '@nestjs/common';
import { InventoryHistoryService } from './inventory-history.service';
import { InventoryHistoryResolver } from './inventory-history.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import {
  InventoryHistory,
  InventoryHistorySchema,
} from './entities/inventory-history.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InventoryHistory.name, schema: InventoryHistorySchema },
    ]),
  ],
  providers: [InventoryHistoryResolver, InventoryHistoryService],
  exports: [InventoryHistoryService],
})
export class InventoryHistoryModule {}
