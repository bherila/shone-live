import { Test, TestingModule } from "@nestjs/testing";

import { ShowGateway } from "./show.gateway";

describe("ShowGateway", () => {
  let gateway: ShowGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShowGateway],
    }).compile();

    gateway = module.get<ShowGateway>(ShowGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
