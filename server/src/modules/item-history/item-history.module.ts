import {forwardRef, Module} from '@nestjs/common';
import { ItemHistoryService } from './item-history.service';
import { ItemHistoryResolver } from './item-history.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemHistory, ItemHistorySchema } from './entities/item-history.entity';
import {ItemService} from "../item/item.service";
import {ItemModule} from "../item/item.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ItemHistory.name, schema: ItemHistorySchema },
    ]),
    forwardRef(() => ItemModule),
  ],
  providers: [ItemHistoryResolver, ItemHistoryService],
  exports: [ItemHistoryService],
})
export class ItemHistoryModule {}
