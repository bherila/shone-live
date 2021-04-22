import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from "class-validator";

import {
  IncompatableWith,
  RequiredIfMissing,
} from "../../common/validation/validation-helpers";

export class CreateShowDto {
  @ApiProperty({
    description: `the user who is hosting this show
    currently shows only have one host who owns the show data`,
    example: `cus_IPqRS333voIGbS`,
  })
  @IsString()
  public readonly user_id: string;

  @ApiProperty({
    description:
      `time the show actually started at. ` +
      `if a show is not scheduled in advance` +
      `this field must be passed to indicate that ` +
      `the show is being created at the same time it is going live. ` +
      `if the show is being created prior to going live then` +
      `this must not be passed during creation; ` +
      `however, in that case this must be passed at the time ` +
      `the show actually starts`,
    example: `2020-11-22T20:39:12+00:00`,
  })
  @IncompatableWith(["scheduled_start", "scheduled_end"])
  @RequiredIfMissing(["scheduled_start", "scheduled_end"])
  @IsDateString()
  public readonly start: string;

  @ApiProperty({
    description:
      `the time that the show is scheduled to start at` +
      `(it's a datetime, format https://en.wikipedia.org/wiki/ISO_8601)` +
      `required unless the show is immediately live, ie has a start (time)`,
    example: `2020-11-22T20:39:12+00:00`,
  })
  @RequiredIfMissing(["start"])
  @IncompatableWith(["start"])
  @IsDateString()
  public readonly scheduled_start?: string;

  @ApiProperty({
    description:
      `the time that the show is scheduled to end at` +
      `(it's a datetime, format https://en.wikipedia.org/wiki/ISO_8601)` +
      `required unless the show is immediately live, ie has a start (time)`,
    example: `2020-11-22T21:39:12+00:00`,
  })
  @RequiredIfMissing(["start"])
  @IncompatableWith(["start"])
  @IsDateString()
  public readonly scheduled_end?: string;

  @ApiProperty({
    description: `the display description for customers,
    this should entice users to check out the show`,
    example: `The coolest host with the coolest products will show you
    everything you've been dying to purchase this season`,
  })
  @IsString()
  public readonly description: string;

  @ApiProperty({
    description: `show name`,
    example: `The Ski Show - New Ski Bindings Edition`,
  })
  @IsString()
  public readonly name: string;

  @ApiProperty({
    description:
      `the id of the main preview video for the show` +
      `required unless the show is unscheduled (ie scheduled = false)`,
    example: `1a0e4ba8-f31c-4ad2-ad5c-8ba6d35b7ce7`,
    type: "UUID",
  })
  @IsUUID()
  @ValidateIf((o) => !o.start)
  public readonly video_id: string;

  @ApiProperty({
    description:
      `the id of the main preview photo for the show` +
      `required unless the show is unscheduled (ie scheduled = false)`,
    example: `b644cec4-0487-4f6f-bac1-c80059a2a4b0`,
    type: "UUID",
  })
  @IsUUID()
  @ValidateIf((o) => !o.start)
  public readonly photo_id: string;

  @ApiProperty({
    description: `the room information from agora`,
    example: `{
      "appId":"f488493d1886435f963dfb3d95984fd4",
      "roomName":"Rocky’s Live",
      "roomId":"101940351140368384",
      "channelName":"30e73c1c99aa8b4c35657778d1056eab",
      "thumbnail":"https://twitter.com/explore/test.png",
      "muteAllChat":0,
      "state":1,
      "type":5,
      "currentUsers":1,
      "owner":{
        "uid":1380625893,
        "userId":"101244212439158784"
      }
    }`,
    type: "JSON",
  })
  @IsOptional()
  public readonly agora_room?: any;
}
