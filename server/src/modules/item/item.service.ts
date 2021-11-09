import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {CreateItemInput} from './dto/create-item.input';
import {UpdateItemInput} from './dto/update-item.input';
import {InjectModel} from "@nestjs/mongoose";
import Mongoose, {Model} from "mongoose";
import {NodeService} from "../node/node.service";
import {Item, ItemDocument} from "./entities/item.entity";
import * as fs from "fs";
import {InventoryHistoryService} from "../inventory-history/inventory-history.service";
import {CreateInventoryHistoryInput} from "../inventory-history/dto/create-inventory-history.input";
import {InventoryActivity} from "../inventory-history/entities/inventory-history.entity";
import {Node} from "../node/entities/node.entity";
import {ItemHistoryService} from "../item-history/item-history.service";

@Injectable()
export class ItemService {

  constructor(
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
    @Inject(forwardRef(() => NodeService))
    private nodeService: NodeService,
    private inventoryHistoryService: InventoryHistoryService,
    private itemHistoryService: ItemHistoryService
  ) {}

  populateItemObject = {
    path: '_id',
    populate: [
      {
        path: 'createdBy'
      },
      {
        path: 'parent'
      }
    ]
  }

  async create(createItemInput: CreateItemInput, createdBy: string) {
    createItemInput._id = await  this.nodeService.create(
      createItemInput.parent, createdBy, true
    );
    const itemDoc = await new this.itemModel(createItemInput).save();
    await this.itemModel.populate(itemDoc, this.populateItemObject);
    const createInventoryHistoryInput = new CreateInventoryHistoryInput();
    createInventoryHistoryInput.item = createItemInput._id;
    createInventoryHistoryInput.user = createdBy;
    createInventoryHistoryInput.quantity = createItemInput.quantity;
    createInventoryHistoryInput.activityType = InventoryActivity.ADD;
    await this.inventoryHistoryService.create(createInventoryHistoryInput);
    return itemDoc;
  }

  async getAllChildren(id) {
    const nodes = await this.nodeService.findAllChildren(id);
    const items = await this.itemModel.find({_id: {$in: nodes}});
    await this.itemModel.populate(items, this.populateItemObject);
    return items;
  }

  findOne(id: string) {
    return this.itemModel.findById(id).populate({
      path: '_id',
      model: Node.name,
      populate: {
        path: 'createdBy'
      }
    });
  }

  update(id: string, updateItemInput: UpdateItemInput) {
    return this.itemModel.findByIdAndUpdate(
      id,
      updateItemInput as any,
      {new: true}
    );
  }

  async deleteMany(ids: any[]) {
    for (const id of ids)
      fs.rmSync(`./uploads/${id}`, {force: true});
    await this.itemHistoryService.deleteItemRelatedHistory(ids);
    await this.inventoryHistoryService.deleteItemRelatedHistory(ids);
    return this.itemModel.deleteMany({_id: {$in: ids}});
  }

  reduceQuantity(id: string, reduceBy: number) {
    return this.itemModel.findByIdAndUpdate(id, {$inc: {quantity: -reduceBy}});
  }
}
