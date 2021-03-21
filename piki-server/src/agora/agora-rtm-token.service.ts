import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RtcRole, RtcTokenBuilder } from "agora-access-token";
import { Repository } from "typeorm";

import { ShowsService } from "../shows/shows.service";
import { UsersService } from "../users/users.service";
import { CreateAgoraRtmTokenDto } from "./dto/create-agora-rtm-token.dto";
import { AgoraRtmToken } from "./entities/agora-rtm-token.entity";

// https://github.com/AgoraIO/Tools/tree/master/DynamicKey/AgoraDynamicKey/nodejs
@Injectable()
export class AgoraRtmTokenService {
  APP_ID = process.env.AGORA_APP_ID;
  APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE;
  RTM_ROLE = RtcRole.PUBLISHER;

  constructor(
    @InjectRepository(AgoraRtmToken)
    private readonly agoraRtmTokenRepository: Repository<AgoraRtmToken>,
    private readonly usersService: UsersService,
    private readonly showsService: ShowsService
  ) {}

  async create(
    createAgoraRtmTokenDto: CreateAgoraRtmTokenDto
  ): Promise<AgoraRtmToken> {
    const { show_id, user_id } = createAgoraRtmTokenDto;
    const user = this.usersService.findOne(user_id);
    const show = this.showsService.findOne(show_id);
    const key = RtcTokenBuilder.buildTokenWithAccount(
      this.APP_ID,
      this.APP_CERTIFICATE,
      show_id, // (channelName in agora)
      user_id, // (uid in agora)
      this.RTM_ROLE,
      this.getExpirationTime()
    );
    return Promise.all([user, show]).then(values => {
      const rtm = this.agoraRtmTokenRepository.create({
        user: values[0],
        show: values[1],
        agora_rtm_key: key
      });
      return this.agoraRtmTokenRepository.save(rtm);
    });
  }

  getExpirationTime(expirationTimeInSeconds = 86400): number {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return currentTimestamp + expirationTimeInSeconds;
  }
}
