import { Module } from '@nestjs/common';
import { NodeService } from './node.service';
import {Node, NodeSchema} from "./entities/node.entity";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Node.name, schema: NodeSchema }]),
  ],
  providers: [NodeService],
  exports: [NodeService]
})
export class NodeModule {}
