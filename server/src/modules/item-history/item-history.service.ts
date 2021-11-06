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

  create(createItemHistoryInput: CreateItemHistoryInput) {
    return new this.itemHistoryModel(createItemHistoryInput).save();
  }

  findAll(query) {
    return this.itemHistoryModel.find(query);
  }

  update(updateItemHistoryInput: UpdateItemHistoryInput) {
    this.itemHistoryModel.findOneAndUpdate(
      {
        itemId: updateItemHistoryInput.itemId,
        userId: updateItemHistoryInput.userId,
      },
      updateItemHistoryInput,
    );
  }
}
