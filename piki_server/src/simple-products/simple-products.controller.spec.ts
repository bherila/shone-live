import { Test, TestingModule } from '@nestjs/testing';
import { SimpleProductsController } from './simple-products.controller';
import { SimpleProductsService } from './simple-products.service';

describe('SimpleProductsController', () => {
  let controller: SimpleProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimpleProductsController],
      providers: [SimpleProductsService],
    }).compile();

    controller = module.get<SimpleProductsController>(SimpleProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
