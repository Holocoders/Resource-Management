import {Module} from '@nestjs/common';
import {ItemHistoryService} from './item-history.service';
import {ItemHistoryResolver} from './item-history.resolver';
import {MongooseModule} from "@nestjs/mongoose";
import {ItemHistory, ItemHistorySchema} from "./entities/item-history.entity";
import {Item, ItemSchema} from "../item/entities/item.entity";
import {ItemModule} from "../item/item.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ItemHistory.name, schema: ItemHistorySchema }]),
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    ItemModule
  ],
  providers: [
    ItemHistoryResolver,
    ItemHistoryService
  ]
})
export class ItemHistoryModule {}
