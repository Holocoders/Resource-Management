import { forwardRef, Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemResolver } from './item.resolver';
import { NodeModule } from '../node/node.module';
import { Item, ItemSchema } from './entities/item.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '../shared/shared.module';
import { InventoryHistoryModule } from '../inventory-history/inventory-history.module';
import { ItemHistoryModule } from '../item-history/item-history.module';

@Module({
  providers: [ItemResolver, ItemService],
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    forwardRef(() => NodeModule),
    SharedModule,
    InventoryHistoryModule,
    ItemHistoryModule,
  ],
  exports: [ItemService],
})
export class ItemModule {}
