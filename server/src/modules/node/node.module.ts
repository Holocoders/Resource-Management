import { Module } from '@nestjs/common';
import { NodeService } from './node.service';
import { NodeResolver } from './node.resolver';

@Module({
  providers: [NodeResolver, NodeService]
})
export class NodeModule {}
