import {Injectable} from '@nestjs/common';
import {CreateItemInput} from './dto/create-item.input';
import {UpdateItemInput} from './dto/update-item.input';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {NodeService} from "../node/node.service";
import {Item, ItemDocument} from "./entities/item.entity";
import * as fs from "fs";
import Mongoose from "mongoose";
import {Node} from "../node/entities/node.entity";
import {User} from "../user/entities/user.entity";

@Injectable()
export class ItemService {

  constructor(
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
    private nodeService: NodeService,
  ) {}

  async create(createItemInput: CreateItemInput, createdBy: string) {
    createItemInput._id = await  this.nodeService.create(
      createItemInput.parent, createdBy, true
    );
    return new this.itemModel(createItemInput).save();
  }

  findAll() {
    return this.itemModel.find();
  }

  findOne(id: string) {
    return this.itemModel.findById(id).populate({
      path: '_id',
      model: Node.name,
      populate: {
        path: 'createdBy',
        model: User.name
      }
    });
  }

  update(id: string, updateItemInput: UpdateItemInput) {
    return this.itemModel.findByIdAndUpdate(
      id,
      updateItemInput as unknown as Mongoose.UpdateQuery<ItemDocument>,
      {new: true}
    );
  }

  async remove(id: string) {
    const path = `./uploads/${id}`
    if (fs.existsSync(path))
      fs.rmSync(path)
    await this.nodeService.remove(id);
    return this.itemModel.findByIdAndRemove(id);
  }

  reduceQuantity(id: string, reduceBy: number) {
    return this.itemModel.findByIdAndUpdate(id, {$inc: {quantity: -reduceBy}});
  }
}
