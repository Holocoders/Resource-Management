import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateNodeInput } from './dto/create-node.input';
import { InjectModel } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Node, NodeDocument } from './entities/node.entity';
import * as fs from 'fs';
import { ItemService } from '../item/item.service';
import { CategoryService } from '../category/category.service';
import { FacilityService } from '../facility/facility.service';

@Injectable()
export class NodeService {
  constructor(
    @InjectModel(Node.name) private nodeModel: Model<NodeDocument>,
    @Inject(forwardRef(() => ItemService))
    private itemService: ItemService,
    @Inject(forwardRef(() => CategoryService))
    private categoryService: CategoryService,
    @Inject(forwardRef(() => FacilityService))
    private facilityService: FacilityService,
  ) {}

  async create(parent: any, createdBy: string, isItem = false) {
    const createNodeInput = new CreateNodeInput(parent, createdBy, isItem);
    const nodeDocument = new this.nodeModel(createNodeInput);
    const node = await nodeDocument.save();
    return node._id;
  }

  findOne(id: string) {
    return this.nodeModel.findById(id);
  }

  async findAllChildren(id: string, returnItems = true) {
    let nodes = await this.nodeModel.find({
      parent: id,
      isItem: returnItems,
    } as any);
    nodes = nodes.map((val) => val._id);
    return nodes;
  }

  async remove(id: string) {
    const nodesToRemove = await this.nodeModel.aggregate([
      {
        $graphLookup: {
          from: 'nodes',
          startWith: '$_id',
          connectFromField: '_id',
          connectToField: 'parent',
          as: 'nodesToRemove',
        },
      },
      {
        $match: {
          _id: new Mongoose.Types.ObjectId(id),
        },
      },
    ]);
    const nodeIds = [id];
    fs.rmSync(`./uploads/${id}`, { force: true });
    for (const node of nodesToRemove[0].nodesToRemove) {
      nodeIds.push(node._id);
      fs.rmSync(`./uploads/${node._id}`, { force: true });
    }
    await this.facilityService.deleteMany(nodeIds);
    await this.itemService.deleteMany(nodeIds);
    await this.categoryService.deleteMany(nodeIds);
    await this.nodeModel.deleteMany({ _id: { $in: nodeIds } });
    return true;
  }
}
