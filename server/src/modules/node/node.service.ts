import { Injectable } from '@nestjs/common';
import { CreateNodeInput } from './dto/create-node.input';
import { UpdateNodeInput } from './dto/update-node.input';

@Injectable()
export class NodeService {
  create(createNodeInput: CreateNodeInput) {
    return 'This action adds a new node';
  }

  findAll() {
    return `This action returns all node`;
  }

  findOne(id: number) {
    return `This action returns a #${id} node`;
  }

  update(id: number, updateNodeInput: UpdateNodeInput) {
    return `This action updates a #${id} node`;
  }

  remove(id: number) {
    return `This action removes a #${id} node`;
  }
}
