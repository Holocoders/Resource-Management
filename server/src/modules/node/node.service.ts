import {Injectable} from '@nestjs/common';
import {CreateNodeInput} from './dto/create-node.input';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Node, NodeDocument} from './entities/node.entity';

@Injectable()
export class NodeService {
  constructor(@InjectModel(Node.name) private nodeModel: Model<NodeDocument>) {}

  async create(parent: any, isItem = false) {
    const createNodeInput = new CreateNodeInput(parent, isItem);
    const nodeDocument = new this.nodeModel(createNodeInput);
    const node = await nodeDocument.save();
    return node._id;
  }

  findOne(id: string) {
    return this.nodeModel.findById(id);
  }

  remove(id: string) {
    return this.nodeModel.findByIdAndRemove(id);
  }
}
