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
import {
  BuyItemInput,
  RentItemInput,
} from 'src/modules/item-history/dto/transact-item.input';
import { NodeType } from 'src/modules/node/entities/node.entity';
import { Item } from 'src/modules/item/entities/item.entity';

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

  async buyItem(buyItemInput: BuyItemInput) {
    buyItemInput.activityType = ItemActivity.BUY;
    console.log(buyItemInput);
    const itemHistory = new this.itemHistoryModel(buyItemInput);
    return itemHistory.save();
  }

  async rentItem(rentItemInput: RentItemInput) {
    rentItemInput.activityType = ItemActivity.RENT;
    const itemHistory = new this.itemHistoryModel(rentItemInput);
    return itemHistory.save();
  }

  async runPipeline(itemId: string, endPipeline: any[]) {
    const populateNodePipeline = [
      {
        $lookup: {
          from: 'nodes',
          localField: 'item',
          foreignField: '_id',
          as: 'node',
          pipeline: [{ $project: { _id: 0, type: 1 } }],
        },
      },
      { $unwind: '$node' },
    ];
    const itemNodePipeline = [
      {
        $match: {
          'node.type': NodeType.ITEM,
        },
      },
    ];
    const packNodePipeline = [
      {
        $match: {
          'node.type': NodeType.PACK,
        },
      },
      {
        $lookup: {
          from: 'items',
          localField: 'item',
          foreignField: '_id',
          as: 'item',
          pipeline: [
            { $project: { _id: 0, packItems: 1 } },
            { $unwind: '$packItems' },
            {
              $match: {
                'packItems.item': Mongoose.Types.ObjectId(itemId),
              },
            },
          ],
        },
      },
      { $unwind: '$item' },
      {
        $set: {
          quantity: { $multiply: ['$quantity', '$item.packItems.quantity'] },
        },
      },
    ];
    const result = await this.itemHistoryModel.aggregate([
      ...populateNodePipeline,
      {
        $facet: {
          packQty: packNodePipeline,
          itemQty: itemNodePipeline,
        },
      },
      { $project: { completeSet: { $setUnion: ['$packQty', '$itemQty'] } } },
      { $unwind: '$completeSet' },
      { $replaceRoot: { newRoot: '$completeSet' } },
      ...endPipeline,
    ]);
    return result[0]?.total || 0;
  }

  findItemsBought(itemId: string, issueDate: Date) {
    const buyPipeline = [
      {
        $match: {
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
          _id: '',
          total: { $sum: '$quantity' },
        },
      },
    ];
    return this.runPipeline(itemId, buyPipeline);
  }

  findItemsRented(itemId: string, issueDate: Date, dueDate: Date) {
    const rentPipeline = [
      {
        $match: {
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
          _id: '',
          total: { $sum: '$quantity' },
        },
      },
    ];
    return this.runPipeline(itemId, rentPipeline);
  }

  async findItemAvailability(
    item: Item,
    activityType: ItemActivity,
    issueDate: Date,
    dueDate: Date,
  ) {
    const totalQty = item['quantity'];
    const itemID = item.node['_id'].toString();
    switch (activityType) {
      case ItemActivity.BUY:
        return totalQty - (await this.findItemsBought(itemID, issueDate));
      case ItemActivity.RENT:
        return (
          totalQty - (await this.findItemsRented(itemID, issueDate, dueDate))
        );
      default:
        return new GraphQLError('Invalid activity type');
    }
  }

  async findAvailability(
    itemId: string,
    activityType: ItemActivity,
    issueDate: Date,
    dueDate: Date,
  ) {
    const item = await this.itemService.findById(itemId);
    if (!item) {
      throw new GraphQLError('Item not found');
    }
    if (item.node['type'] === 'ITEM') {
      return await this.findItemAvailability(
        item,
        activityType,
        issueDate,
        dueDate,
      );
    }
    let availability = Number.MAX_SAFE_INTEGER;
    if (item.node['type'] === 'PACK') {
      for (const { item: it, quantity } of item.packItems) {
        const currentAvailability = await this.findItemAvailability(
          it as Item,
          activityType,
          issueDate,
          dueDate,
        );
        if (typeof currentAvailability === 'number') {
          availability = Math.min(
            availability,
            Math.floor(currentAvailability / quantity),
          );
        } else {
          return currentAvailability;
        }
      }
    }
    return availability;
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

// {
// ...populateNode,
// ...populateItem,
//   $unwind: '$node',
//   $match: {
//   itemState: { $ne: ItemState.CANCELLED },
//   $or: [
//     {
//       activityType: ItemActivity.BUY,
//     },
//     {
//       activityType: ItemActivity.RENT,
//       dueDate: { $gte: issueDate },
//     },
//   ],
// },
// },
// { $project: { quantity: 1 } },
// {
//   $group: {
//     _id: '',
//       bought: { $sum: '$quantity' },
//   },
// },

// db.itemhistories.aggregate([ {$project: {item: 1, quantity: 1}} ,{
//   $lookup: {
//     from: 'nodes',
//     localField: 'item',
//     foreignField: '_id',
//     as: 'node',
//     pipeline: [
//       {$project: {type: 1}},
//       {$match: {type: 'PACK'}}
//     ]
//   },
// }, {
//   $lookup: {
//     from: 'items',
//     localField: 'item',
//     foreignField: '_id',
//     as: 'item',
//     pipeline: [
//       {$project: {packItems: 1}},
//       {$unwind: '$packItems'},
//       {$match: {'packItems.item': ObjectId('621c8b65d851aa458827e176')} }
//     ]
//   },
// },
//   { $unwind: '$node' },
//   {$set: {quantity: { $multiply: ["$quantity", {$getField: {field: 'quantity', input: {$arrayElemAt: ["$item.packItems", 0]}}}]}}}])
