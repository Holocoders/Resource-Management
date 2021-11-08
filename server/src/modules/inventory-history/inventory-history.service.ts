import {Injectable} from '@nestjs/common';
import {CreateInventoryHistoryInput} from './dto/create-inventory-history.input';
import {UpdateInventoryHistoryInput} from './dto/update-inventory-history.input';
import {InjectModel} from "@nestjs/mongoose";
import {InventoryHistory, InventoryHistoryDocument} from "./entities/inventory-history.entity";
import {Model} from "mongoose";

@Injectable()
export class InventoryHistoryService {

  constructor(
    @InjectModel(InventoryHistory.name)
    private inventoryHistoryModel: Model<InventoryHistoryDocument>
  ) {
  }

  populateObject: any = {
    path: 'itemId',
    populate: {
      path: '_id',
      populate: {
        path: 'createdBy'
      }
    }
  };

  create(createInventoryHistoryInput: CreateInventoryHistoryInput) {
    return new this.inventoryHistoryModel(createInventoryHistoryInput).save();
  }

  findAll() {
    return this.inventoryHistoryModel.find().populate(this.populateObject);
  }

  findOne(id: string) {
    return this.inventoryHistoryModel.findById(id).populate(this.populateObject);
  }

  update(updateInventoryHistoryInput: UpdateInventoryHistoryInput) {
    const {itemId, userId} = updateInventoryHistoryInput;
    return this.inventoryHistoryModel.findByIdAndUpdate(
      {itemId, userId},
      updateInventoryHistoryInput as any
    ).populate(this.populateObject);
  }
}
