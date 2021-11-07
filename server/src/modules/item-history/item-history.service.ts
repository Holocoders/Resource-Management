import {Injectable} from '@nestjs/common';
import {CreateItemHistoryInput} from './dto/create-item-history.input';
import {UpdateItemHistoryInput} from './dto/update-item-history.input';
import {ItemHistory, ItemHistoryDocument,} from './entities/item-history.entity';
import * as Mongoose from 'mongoose';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {Item, ItemDocument} from "../item/entities/item.entity";
import {User} from "../user/entities/user.entity";
import {Node} from "../node/entities/node.entity";

@Injectable()
export class ItemHistoryService {
  constructor(
    @InjectModel(ItemHistory.name)
    private itemHistoryModel: Model<ItemHistoryDocument>
  ) {}

  populateItemObject = {
    path: 'itemId',
    populate: {
      path: '_id',
      populate: {
        path: 'createdBy'
      }
    }
  }

  populateUserObject = {
    path: 'userId'
  }

  async create(createItemHistoryInput: CreateItemHistoryInput) {
    const itemHistory = await new this.itemHistoryModel(createItemHistoryInput).save();
    await this.itemHistoryModel.populate(itemHistory, this.populateItemObject)
    await this.itemHistoryModel.populate(itemHistory, this.populateUserObject);
    return itemHistory;
  }

  findAll(query) {
    return this.itemHistoryModel.find(query)
      .populate(this.populateItemObject)
      .populate(this.populateUserObject);
  }

  update(updateItemHistoryInput: UpdateItemHistoryInput) {
    const {itemId, userId} = updateItemHistoryInput;
    return this.itemHistoryModel.findOneAndUpdate(
      {itemId, userId} as any,
      updateItemHistoryInput as any,
    ).populate(this.populateItemObject).populate(this.populateUserObject);
  }
}
