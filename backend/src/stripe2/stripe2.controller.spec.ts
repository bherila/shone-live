import { Test, TestingModule } from "@nestjs/testing";

import { Stripe2Controller } from "./stripe2.controller";
import { Stripe2Service } from "./stripe2.service";

describe("Stripe2Controller", () => {
  let controller: Stripe2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Stripe2Controller],
      providers: [Stripe2Service],
    }).compile();

    controller = module.get<Stripe2Controller>(Stripe2Controller);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
