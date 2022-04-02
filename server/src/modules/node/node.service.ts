import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateNodeInput } from './dto/create-node.input';
import { InjectModel } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Node, NodeDocument, NodeType } from './entities/node.entity';
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

  async updateCounts(node: Node, type: NodeType, inc: boolean) {
    if (type === NodeType.CATEGORY) {
      await this.nodeModel.findByIdAndUpdate(node.parent, {
        $inc: {
          categoryCount: inc ? 1 : -1,
          itemCount: inc ? node.itemCount : -node.itemCount,
        },
      });
      return;
    }
    const nodesToUpdate = await this.nodeModel.aggregate([
      {
        $graphLookup: {
          from: 'nodes',
          startWith: '$parent',
          connectFromField: 'parent',
          connectToField: '_id',
          as: 'nodesToUpdate',
        },
      },
      {
        $match: { _id: new Mongoose.Types.ObjectId(node._id) },
      },
    ]);
    if (type === NodeType.ITEM) {
      await this.nodeModel.updateMany(
        {
          _id: { $in: nodesToUpdate[0].nodesToUpdate.map((node) => node._id) },
        },
        { $inc: { itemCount: inc ? 1 : -1 } },
      );
    } else if (type === NodeType.PACK) {
      await this.nodeModel.updateMany(
        {
          _id: { $in: nodesToUpdate[0].nodesToUpdate.map((node) => node._id) },
        },
        { $inc: { packCount: inc ? 1 : -1 } },
      );
    }
  }

  async create(parent: any, createdBy: string, type: NodeType) {
    const createNodeInput = new CreateNodeInput(parent, createdBy, type);
    const nodeDocument = new this.nodeModel(createNodeInput);
    const node = await nodeDocument.save();
    if (!parent) {
      return node._id;
    }
    await this.updateCounts(node, type, true);
    return node._id;
  }

  async findAllChildren(id: string, type: NodeType) {
    let nodes = await this.nodeModel.find({
      parent: id,
      type,
    } as any);
    nodes = nodes.map((value) => value._id);
    return nodes;
  }

  async remove(id: string) {
    const node = await this.nodeModel.findById(id);
    await this.updateCounts(node, node.type, false);
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
    return this.nodeModel.findById(node.parent);
  }

  async getParentIDs(id) {
    if (!id) {
      return [];
    }
    const node = await this.nodeModel.aggregate([
      {
        $graphLookup: {
          from: 'nodes',
          startWith: '$parent',
          connectFromField: 'parent',
          connectToField: '_id',
          as: 'parentNodes',
        },
      },
      {
        $match: { _id: new Mongoose.Types.ObjectId(id) },
      },
    ]);
    let parentIDs = [id];
    if (!node || node.length == 0) return [id];
    parentIDs = [
      ...parentIDs,
      ...node[0].parentNodes.map((node) => node._id.toString()),
    ];
    return parentIDs;
  }
}
