import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class CreateAgoraRtmTokenDto {
  @ApiProperty({
    description:
      `the user who wants a token` +
      `to grant access to the agora channel for a show`,
    example: `cus_IPqRS333voIGbS`,
  })
  @IsString()
  public readonly user_id: string;

  @ApiProperty({
    description:
      `the show which this agora channel is being used for` +
      `and which the user wants to join`,
    example: `b644cec4-0487-4f6f-bac1-c80059a2a4b0`,
    type: "UUID",
  })
  @IsUUID()
  public readonly show_id: string;
}
