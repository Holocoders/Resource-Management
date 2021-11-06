import { Module } from '@nestjs/common';
import { ItemHistoryService } from './item-history.service';
import { ItemHistoryResolver } from './item-history.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemHistory, ItemHistorySchema } from './entities/item-history.entity';
import { UserModule } from '../user/user.module';
import { ItemModule } from '../item/item.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ItemHistory.name, schema: ItemHistorySchema },
    ]),
  ],
  providers: [ItemHistoryResolver, ItemHistoryService],
})
export class ItemHistoryModule {}
