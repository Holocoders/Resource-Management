import { Injectable } from '@nestjs/common';
import { CreateInventoryHistoryInput } from './dto/create-inventory-history.input';
import { UpdateInventoryHistoryInput } from './dto/update-inventory-history.input';

@Injectable()
export class InventoryHistoryService {
  create(createInventoryHistoryInput: CreateInventoryHistoryInput) {
    return 'This action adds a new inventoryHistory';
  }

  findAll() {
    return `This action returns all inventoryHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventoryHistory`;
  }

  update(id: number, updateInventoryHistoryInput: UpdateInventoryHistoryInput) {
    return `This action updates a #${id} inventoryHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventoryHistory`;
  }
}
