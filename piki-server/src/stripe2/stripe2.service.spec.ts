import { Test, TestingModule } from "@nestjs/testing";

import { Stripe2Service } from "./stripe2.service";

describe("Stripe2Service", () => {
  let service: Stripe2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Stripe2Service]
    }).compile();

    service = module.get<Stripe2Service>(Stripe2Service);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
