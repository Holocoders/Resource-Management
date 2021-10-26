import { Test, TestingModule } from '@nestjs/testing';
import { InventoryHistoryService } from './inventory-history.service';

describe('InventoryHistoryService', () => {
  let service: InventoryHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryHistoryService],
    }).compile();

    service = module.get<InventoryHistoryService>(InventoryHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
