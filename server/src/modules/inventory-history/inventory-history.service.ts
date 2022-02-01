import { Injectable } from '@nestjs/common';
import {
  CreateInventoryHistoryInput
} from './dto/create-inventory-history.input';
import {
  UpdateInventoryHistoryInput
} from './dto/update-inventory-history.input';
import { InjectModel } from '@nestjs/mongoose';
import {
  InventoryHistory,
  InventoryHistoryDocument,
} from './entities/inventory-history.entity';
import { Model } from 'mongoose';

@Injectable()
export class InventoryHistoryService {
  constructor(
    @InjectModel(InventoryHistory.name)
    private inventoryHistoryModel: Model<InventoryHistoryDocument>,
  ) {}

  create(createInventoryHistoryInput: CreateInventoryHistoryInput) {
    return new this.inventoryHistoryModel(createInventoryHistoryInput).save();
  }

  findAll(query?: any) {
    if (!query) return this.inventoryHistoryModel.find();
    return this.inventoryHistoryModel.find(query);
  }

  update(updateInventoryHistoryInput: UpdateInventoryHistoryInput) {
    const { item, user } = updateInventoryHistoryInput;
    return this.inventoryHistoryModel.findByIdAndUpdate(
      { item, user },
      updateInventoryHistoryInput as any,
    );
  }

  deleteItemRelatedHistory(ids: string[]) {
    return this.inventoryHistoryModel.deleteMany({ item: { $in: ids } } as any);
  }
}
