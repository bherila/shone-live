import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Show } from "../shows/entities/show.entity";
import { ShowsModule } from "../shows/shows.module";
import { User } from "../users/entities/user.entity";
import { UsersModule } from "../users/users.module";
import { AgoraController } from "./agora.controller";
import { AgoraRtmTokenService } from "./agora-rtm-token.service";
import { AgoraRtmToken } from "./entities/agora-rtm-token.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Show, AgoraRtmToken]),
    ShowsModule,
    UsersModule
  ],
  controllers: [AgoraController],
  providers: [AgoraRtmTokenService]
})
export class AgoraModule {}
