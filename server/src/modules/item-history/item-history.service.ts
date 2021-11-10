import { Injectable } from '@nestjs/common';
import { CreateItemHistoryInput } from './dto/create-item-history.input';
import { UpdateItemHistoryInput } from './dto/update-item-history.input';
import {
  ItemHistory,
  ItemHistoryDocument,
} from './entities/item-history.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Node } from '../node/entities/node.entity';

@Injectable()
export class ItemHistoryService {
  populateObject = [
    {
      path: 'item',
      populate: {
        path: '_id',
        model: Node.name,
        populate: {
          path: 'createdBy',
        },
      },
    },
    {
      path: 'user',
    },
  ];

  constructor(
    @InjectModel(ItemHistory.name)
    private itemHistoryModel: Model<ItemHistoryDocument>,
  ) {}

  async create(createItemHistoryInput: CreateItemHistoryInput) {
    const itemHistory = await new this.itemHistoryModel(
      createItemHistoryInput,
    ).save();
    await this.itemHistoryModel.populate(itemHistory, this.populateObject);
    return itemHistory;
  }

  findAll(query) {
    return this.itemHistoryModel.find(query).populate(this.populateObject);
  }

  deleteItemRelatedHistory(ids: string[]) {
    return this.itemHistoryModel.deleteMany({ item: { $in: ids } } as any);
  }

  update(updateItemHistoryInput: UpdateItemHistoryInput) {
    const { item, user } = updateItemHistoryInput;
    return this.itemHistoryModel
      .findOneAndUpdate({ item, user } as any, updateItemHistoryInput as any)
      .populate(this.populateObject);
  }
}
