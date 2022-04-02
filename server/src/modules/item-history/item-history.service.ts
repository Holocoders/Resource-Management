import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateItemHistoryInput } from './dto/create-item-history.input';
import { UpdateItemHistoryInput } from './dto/update-item-history.input';
import {
  ItemActivity,
  ItemHistory,
  ItemHistoryDocument,
  ItemState,
} from './entities/item-history.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';
import { ItemService } from '../item/item.service';
import { GraphQLError } from 'graphql';

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

  async findItemAvailabilityBuy(itemId: string, issueDate: Date) {
    const totalQty = (await this.itemService.findOne(itemId))['quantity'];
    const result = await this.itemHistoryModel.aggregate([
      {
        $match: {
          item: Mongoose.Types.ObjectId(itemId),
          itemState: { $ne: ItemState.CANCELLED },
          $or: [
            {
              activityType: ItemActivity.BUY,
            },
            {
              activityType: ItemActivity.RENT,
              dueDate: { $gte: issueDate },
            },
          ],
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
    return totalQty - bought;
  }

  async findItemAvailabilityRent(
    itemId: string,
    issueDate: Date,
    dueDate: Date,
  ) {
    const totalQty = (await this.itemService.findOne(itemId))['quantity'];
    const result = await this.itemHistoryModel.aggregate([
      {
        $match: {
          item: Mongoose.Types.ObjectId(itemId),
          itemState: { $ne: ItemState.CANCELLED },
          $or: [
            {
              activityType: ItemActivity.BUY,
              issueDate: { $lte: dueDate },
            },
            {
              activityType: ItemActivity.RENT,
              $and: [
                { issueDate: { $lte: dueDate } },
                { dueDate: { $gte: issueDate } },
              ],
            },
          ],
        },
      },
      {
        $group: {
          _id: '$item',
          rented: { $sum: '$quantity' },
        },
      },
    ]);
    const rented = result[0] ? result[0]['rented'] : 0;
    return totalQty - rented;
  }

  async findItemAvailability(
    itemId: string,
    activityType: ItemActivity,
    issueDate: Date,
    dueDate: Date,
  ) {
    switch (activityType) {
      case ItemActivity.BUY:
        return await this.findItemAvailabilityBuy(itemId, issueDate);
      case ItemActivity.RENT:
        return await this.findItemAvailabilityRent(itemId, issueDate, dueDate);
      default:
        return new GraphQLError('Invalid activity type');
    }
  }

  findAll(query?: any, projection?: any) {
    if (!query) return this.itemHistoryModel.find();
    return this.itemHistoryModel.find(query, projection);
  }

  deleteItemRelatedHistory(ids: string[]) {
    return this.itemHistoryModel.deleteMany({ item: { $in: ids } } as any);
  }

  update(updateItemHistoryInput: UpdateItemHistoryInput) {
    const { item, user } = updateItemHistoryInput;
    return this.itemHistoryModel.findOneAndUpdate(
      { item, user } as any,
      updateItemHistoryInput as any,
      { new: true },
    );
  }
}
