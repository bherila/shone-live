import { Column, Entity, ManyToOne } from "typeorm";

import { BasicColumns } from "../../common/database/basic-columns.entity";
import { Show } from "../../shows/entities/show.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class AgoraRtmToken extends BasicColumns {
  @Column({
    comment:
      `the RTM key returned from the agora server` +
      `for a unique user/show combination`,
  })
  agora_rtm_key: string;

  @ManyToOne((type) => User, (user) => user.agoraRtmTokens, {
    cascade: ["insert", "update"],
  })
  user: User;

  @ManyToOne((type) => Show, (show) => show.agoraRtmTokens, {
    cascade: ["insert", "update"],
  })
  show: Show;
}
