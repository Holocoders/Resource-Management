import {Injectable} from '@nestjs/common';
import {CreateInventoryHistoryInput} from './dto/create-inventory-history.input';
import {UpdateInventoryHistoryInput} from './dto/update-inventory-history.input';
import {InjectModel} from "@nestjs/mongoose";
import {InventoryHistory, InventoryHistoryDocument} from "./entities/inventory-history.entity";
import {Model} from "mongoose";
import {Item} from "../item/entities/item.entity";

@Injectable()
export class InventoryHistoryService {

  constructor(
    @InjectModel(InventoryHistory.name)
    private inventoryHistoryModel: Model<InventoryHistoryDocument>
  ) {
  }

  populateObject: any = [
    {
      path: 'item',
      populate: {
        path: '_id',
        populate: {
          path: 'createdBy'
        }
      }
    },
    {
      path: 'user'
    }
  ];

  create(createInventoryHistoryInput: CreateInventoryHistoryInput) {
    return new this.inventoryHistoryModel(createInventoryHistoryInput).save();
  }

  findAll(query: any) {
    return this.inventoryHistoryModel.find(query).populate(this.populateObject);
  }

  update(updateInventoryHistoryInput: UpdateInventoryHistoryInput) {
    const {item, user} = updateInventoryHistoryInput;
    return this.inventoryHistoryModel.findByIdAndUpdate(
      {item, user},
      updateInventoryHistoryInput as any
    ).populate(this.populateObject);
  }

  deleteItemRelatedHistory(ids: string[]) {
    return this.inventoryHistoryModel.deleteMany({item: {$in: ids}} as any);
  }
}
