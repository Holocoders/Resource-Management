import { Module } from '@nestjs/common';
import { ItemHistoryService } from './item-history.service';
import { ItemHistoryResolver } from './item-history.resolver';

@Module({
  providers: [ItemHistoryResolver, ItemHistoryService]
})
export class ItemHistoryModule {}
