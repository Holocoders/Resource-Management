import { Injectable } from '@nestjs/common';
import { CreateItemHistoryInput } from './dto/create-item-history.input';
import { UpdateItemHistoryInput } from './dto/update-item-history.input';
import {
  ItemHistory,
  ItemHistoryDocument,
} from './entities/item-history.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ItemHistoryService {
  constructor(
    @InjectModel(ItemHistory.name)
    private itemHistoryModel: Model<ItemHistoryDocument>,
  ) {}

  async create(createItemHistoryInput: CreateItemHistoryInput) {
    return await new this.itemHistoryModel(createItemHistoryInput).save();
  }

  findAll(query?: any) {
    if (!query) return this.itemHistoryModel.find();
    return this.itemHistoryModel.find(query);
  }

  deleteItemRelatedHistory(ids: string[]) {
    return this.itemHistoryModel.deleteMany({ item: { $in: ids } } as any);
  }

  update(updateItemHistoryInput: UpdateItemHistoryInput) {
    const { item, user } = updateItemHistoryInput;
    return this.itemHistoryModel
      .findOneAndUpdate({ item, user } as any, updateItemHistoryInput as any);
  }
}
