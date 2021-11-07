import {Module} from '@nestjs/common';
import {ItemService} from './item.service';
import {ItemResolver} from './item.resolver';
import {NodeModule} from "../node/node.module";
import {Item, ItemSchema} from "./entities/item.entity";
import {MongooseModule} from "@nestjs/mongoose";
import {SharedModule} from "../shared/shared.module";

@Module({
  providers: [
    ItemResolver,
    ItemService
  ],
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    NodeModule,
    SharedModule
  ]
})
export class ItemModule {}
