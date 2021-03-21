import { Test, TestingModule } from "@nestjs/testing";

import { AgoraRtmTokenService } from "./agora-rtm-token.service";

describe("AgoraService", () => {
  let service: AgoraRtmTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgoraRtmTokenService]
    }).compile();

    service = module.get<AgoraRtmTokenService>(AgoraRtmTokenService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
