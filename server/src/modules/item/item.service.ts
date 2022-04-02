import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NodeService } from '../node/node.service';
import { Item, ItemDocument } from './entities/item.entity';
import * as fs from 'fs';
import { InventoryHistoryService } from '../inventory-history/inventory-history.service';
import { CreateInventoryHistoryInput } from '../inventory-history/dto/create-inventory-history.input';
import { InventoryActivity } from '../inventory-history/entities/inventory-history.entity';
import { Node, NodeType } from '../node/entities/node.entity';
import { ItemHistoryService } from '../item-history/item-history.service';

@Injectable()
export class ItemService {
  populateObject = [
    {
      path: '_id',
      model: Node.name,
      populate: [
        {
          path: 'createdBy',
        },
      ],
    },
  ];

  constructor(
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
    @Inject(forwardRef(() => NodeService))
    private nodeService: NodeService,
    private inventoryHistoryService: InventoryHistoryService,
    @Inject(forwardRef(() => ItemHistoryService))
    private itemHistoryService: ItemHistoryService,
  ) {}

  async create(createItemInput: CreateItemInput, createdBy: string) {
    createItemInput._id = await this.nodeService.create(
      createItemInput.parent,
      createdBy,
      NodeType.ITEM,
    );
    const itemDocument = await new this.itemModel(createItemInput).save();
    await this.itemModel.populate(itemDocument, this.populateObject);
    const createInventoryHistoryInput = new CreateInventoryHistoryInput();
    createInventoryHistoryInput.item = createItemInput._id;
    createInventoryHistoryInput.user = createdBy;
    createInventoryHistoryInput.quantity = createItemInput.quantity;
    createInventoryHistoryInput.activityType = InventoryActivity.ADD;
    await this.inventoryHistoryService.create(createInventoryHistoryInput);
    return itemDocument;
  }

  async getAllChildren(id) {
    const nodes = await this.nodeService.findAllChildren(id, NodeType.ITEM);
    const items = await this.itemModel.find({ _id: { $in: nodes } });
    await this.itemModel.populate(items, this.populateObject);
    return items;
  }

  findOne(id: string) {
    return this.itemModel.findById(id);
  }

  update(id: string, updateItemInput: UpdateItemInput) {
    return this.itemModel.findByIdAndUpdate(id, updateItemInput as any, {
      new: true,
    });
  }

  async deleteMany(ids: any[]) {
    for (const id of ids) fs.rmSync(`./uploads/${id}`, { force: true });
    await this.itemHistoryService.deleteItemRelatedHistory(ids);
    await this.inventoryHistoryService.deleteItemRelatedHistory(ids);
    return this.itemModel.deleteMany({ _id: { $in: ids } });
  }

  reduceQuantity(id: string, reduceBy: number) {
    return this.itemModel.findByIdAndUpdate(id, {
      $inc: { quantity: -reduceBy },
    });
  }

  relatedItems(id: string) {
    // return Get related items array from DB
  }

  updateRelatedItems(id: string, other: string) {
    // Check if other is in item ID's related items array.
    // If so then increment the counter
    // If not then add it to the array if size is available, else heap pop and then heap push item.
  }
}
