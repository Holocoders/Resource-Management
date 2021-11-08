import {forwardRef, Module} from '@nestjs/common';
import {NodeService} from './node.service';
import {Node, NodeSchema} from './entities/node.entity';
import {MongooseModule} from '@nestjs/mongoose';
import {NodeResolver} from "./node.resolver";
import {ItemModule} from "../item/item.module";
import {CategoryModule} from "../category/category.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Node.name, schema: NodeSchema }]),
    forwardRef(() => ItemModule),
    forwardRef(() => CategoryModule)
  ],
  providers: [NodeService, NodeResolver],
  exports: [NodeService],
})
export class NodeModule {}
