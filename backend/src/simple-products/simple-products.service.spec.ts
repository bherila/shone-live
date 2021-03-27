import { Test, TestingModule } from "@nestjs/testing";

import { SimpleProductsService } from "./simple-products.service";

describe("SimpleProductsService", () => {
  let service: SimpleProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimpleProductsService]
    }).compile();

    service = module.get<SimpleProductsService>(SimpleProductsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
