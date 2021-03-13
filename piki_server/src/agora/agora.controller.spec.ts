import { Test, TestingModule } from '@nestjs/testing';

import { AgoraRtmTokenService } from './agora-rtm-token.service';
import { AgoraController } from './agora.controller';

describe('AgoraController', () => {
  let controller: AgoraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgoraController],
      providers: [AgoraRtmTokenService],
    }).compile();

    controller = module.get<AgoraController>(AgoraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
