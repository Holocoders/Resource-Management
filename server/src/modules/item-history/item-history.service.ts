import { Injectable } from '@nestjs/common';
import { CreateItemHistoryInput } from './dto/create-item-history.input';
import { UpdateItemHistoryInput } from './dto/update-item-history.input';

@Injectable()
export class ItemHistoryService {
  create(createItemHistoryInput: CreateItemHistoryInput) {
    return 'This action adds a new itemHistory';
  }

  findAll() {
    return `This action returns all itemHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemHistory`;
  }

  update(id: number, updateItemHistoryInput: UpdateItemHistoryInput) {
    return `This action updates a #${id} itemHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemHistory`;
  }
}
