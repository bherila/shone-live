import { ApiProperty } from "@nestjs/swagger";

import { AgoraRtmToken } from "../entities/agora-rtm-token.entity";

export class CreateAgoraRtmTokenResponse {
  @ApiProperty({
    description:
      "the token for getting access to a channel when passed with a user_id (uid in Agora) and the show_id (channelName in Agora)",
    example: `0068ee770d944d04be8907796730f55758eIACE8DxqldDyylnHimUHVVxS6pUuYfoFWNdsAj3yIOLeFttiENO0ZiMaIgBxHdbzxmfmXwQAAQDGZ+ZfAgDGZ+ZfAwDGZ+ZfBADGZ+Zf`,
    type: `Agora RTM Token`,
    required: true,
  })
  public readonly agora_rtm_key: string;

  @ApiProperty({
    description:
      `the user who wants a token` +
      `to grant access to the agora channel for a show`,
    example: `cus_IPqRS333voIGbS`,
  })
  public readonly user_id: string;

  @ApiProperty({
    description:
      `the show which this agora channel is being used for` +
      `and which the user wants to join`,
    example: `b644cec4-0487-4f6f-bac1-c80059a2a4b0`,
    type: "UUID",
  })
  public readonly show_id: string;

  constructor(agoraRtmToken: AgoraRtmToken) {
    this.agora_rtm_key = agoraRtmToken.agora_rtm_key;
    this.user_id = agoraRtmToken.user.id;
    this.show_id = agoraRtmToken.show.id;
  }
}
