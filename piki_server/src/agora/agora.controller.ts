import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AgoraRtmTokenService } from './agora-rtm-token.service';
import { CreateAgoraRtmTokenDto } from './dto/create-agora-rtm-token.dto';
import {
  CreateAgoraRtmTokenResponse,
} from './responses/create-agora-rtm-token.response';

@ApiTags('agora')
@Controller('agora')
export class AgoraController {
  constructor(private readonly agoraService: AgoraRtmTokenService) {}

  @ApiOperation({
    summary: `generates a new access token (RTM) for a single agora channel`,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: `request a token from agora and return it`,
    type: CreateAgoraRtmTokenResponse,
  })
  @Post('/rtm_token')
  async create(
    @Body() createAgoraRtmTokenDto: CreateAgoraRtmTokenDto,
  ): Promise<CreateAgoraRtmTokenResponse> {
    return this.agoraService
      .create(createAgoraRtmTokenDto)
      .then(agoraRtmToken => {
        return new CreateAgoraRtmTokenResponse(agoraRtmToken);
      });
  }
}
