import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateItemHistoryInput } from './dto/create-item-history.input';
import { UpdateItemHistoryInput } from './dto/update-item-history.input';
import {
  ItemActivity,
  ItemHistory,
  ItemHistoryDocument,
} from './entities/item-history.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';
import { ItemService } from '../item/item.service';

@Injectable()
export class ItemHistoryService {
  constructor(
    @InjectModel(ItemHistory.name)
    private itemHistoryModel: Model<ItemHistoryDocument>,
    @Inject(forwardRef(() => ItemService))
    private itemService: ItemService,
  ) {}

  async create(createItemHistoryInput: CreateItemHistoryInput) {
    return await new this.itemHistoryModel(createItemHistoryInput).save();
  }

  async findItemAvailability(itemId: string, issueDate: Date, dueDate: Date) {
    const totalQty = (await this.itemService.findOne(itemId))['quantity'];
    let result = await this.itemHistoryModel.aggregate([
      {
        $match: {
          item: Mongoose.Types.ObjectId(itemId),
          issueDate: { $gte: issueDate },
          activityType: ItemActivity.BUY,
          cancelled: false,
        },
      },
      {
        $group: {
          _id: '$item',
          bought: { $sum: '$quantity' },
        },
      },
    ]);
    const bought = result[0] ? result[0]['bought'] : 0;
    result = await this.itemHistoryModel.aggregate([
      {
        $match: {
          item: Mongoose.Types.ObjectId(itemId),
          issueDate: { $gte: issueDate },
          dueDate: { $lte: dueDate },
          activityType: ItemActivity.RENT,
          cancelled: false,
        },
      },
      {
        $group: {
          _id: '$item',
          borrowed: { $sum: '$quantity' },
        },
      },
    ]);
    const borrowed = result[0] ? result[0]['borrowed'] : 0;
    return totalQty - bought - borrowed;
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
    return this.itemHistoryModel.findOneAndUpdate(
      { item, user } as any,
      updateItemHistoryInput as any,
    );
  }
}
