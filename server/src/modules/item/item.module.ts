import {Module} from '@nestjs/common';
import {ItemService} from './item.service';
import {ItemResolver} from './item.resolver';
import {NodeModule} from "../node/node.module";
import {Item, ItemSchema} from "./entities/item.entity";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  providers: [
    ItemResolver,
    ItemService
  ],
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    NodeModule
  ]
})
export class ItemModule {}
