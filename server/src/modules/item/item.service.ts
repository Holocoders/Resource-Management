import {Injectable} from '@nestjs/common';
import {CreateItemInput} from './dto/create-item.input';
import {UpdateItemInput} from './dto/update-item.input';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {NodeService} from "../node/node.service";
import {Item, ItemDocument} from "./entities/item.entity";

@Injectable()
export class ItemService {

  constructor(
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
    private nodeService: NodeService,
  ) {}

  async create(createItemInput: CreateItemInput) {
    createItemInput._id = await  this.nodeService.create(
      createItemInput.parent, true
    );
    return new this.itemModel(createItemInput).save();
  }

  findAll() {
    return this.itemModel.find();
  }

  findOne(id: string) {
    return this.itemModel.findById(id);
  }

  update(id: string, updateItemInput: UpdateItemInput) {
    return this.itemModel.findByIdAndUpdate(id, updateItemInput, {new: true});
  }

  remove(id: string) {
    return this.itemModel.findByIdAndRemove(id);
  }
}
