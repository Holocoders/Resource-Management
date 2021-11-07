import {Injectable} from '@nestjs/common';
import {CreateItemHistoryInput} from './dto/create-item-history.input';
import {UpdateItemHistoryInput} from './dto/update-item-history.input';
import {ItemHistory, ItemHistoryDocument,} from './entities/item-history.entity';
import * as Mongoose from 'mongoose';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Item, ItemDocument} from "../item/entities/item.entity";

@Injectable()
export class ItemHistoryService {
  constructor(
    @InjectModel(ItemHistory.name)
    private itemHistoryModel: Model<ItemHistoryDocument>,
    @InjectModel(Item.name)
    private itemModel: Model<ItemDocument>
  ) {}

  async create(createItemHistoryInput: CreateItemHistoryInput) {
    const itemHistory = await new this.itemHistoryModel(createItemHistoryInput).save();
    await this.itemHistoryModel.populate(itemHistory, 'itemId');
    await this.itemHistoryModel.populate(itemHistory, 'userId');
    return itemHistory;
  }

  findAll(query) {
    return this.itemHistoryModel.find(query);
  }

  update(updateItemHistoryInput: UpdateItemHistoryInput) {
    const {itemId, userId} = updateItemHistoryInput;
    this.itemHistoryModel.findOneAndUpdate(
      {itemId, userId} as Mongoose.FilterQuery<ItemHistoryDocument>,
      updateItemHistoryInput as unknown as Mongoose.UpdateQuery<ItemHistoryDocument>,
    );
  }
}
