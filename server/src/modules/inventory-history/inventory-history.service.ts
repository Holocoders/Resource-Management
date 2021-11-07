import {Injectable} from '@nestjs/common';
import {CreateInventoryHistoryInput} from './dto/create-inventory-history.input';
import {UpdateInventoryHistoryInput} from './dto/update-inventory-history.input';

@Injectable()
export class InventoryHistoryService {
  create(createInventoryHistoryInput: CreateInventoryHistoryInput) {
    return 'This action adds a new inventoryHistory';
  }

  findAll() {
    return `This action returns all inventoryHistory`;
  }

  findOne(id: string) {
    return `This action returns a #${id} inventoryHistory`;
  }

  update(updateInventoryHistoryInput: UpdateInventoryHistoryInput) {
    return `This action updates a inventoryHistory`;
  }

  remove(id: string) {
    return `This action removes a #${id} inventoryHistory`;
  }
}
