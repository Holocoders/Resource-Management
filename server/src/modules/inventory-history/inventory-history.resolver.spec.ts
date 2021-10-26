import { Test, TestingModule } from '@nestjs/testing';
import { InventoryHistoryResolver } from './inventory-history.resolver';
import { InventoryHistoryService } from './inventory-history.service';

describe('InventoryHistoryResolver', () => {
  let resolver: InventoryHistoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryHistoryResolver, InventoryHistoryService],
    }).compile();

    resolver = module.get<InventoryHistoryResolver>(InventoryHistoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
