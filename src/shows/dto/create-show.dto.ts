import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateShowDto {
  @ApiProperty({
    description: `the user who is hosting this show
    currently shows only have one host who owns the show data`,
    example: `cus_IPqRS333voIGbS`,
  })
  @IsString()
  readonly user_id: string;

  @ApiProperty({
    description: `the time that the show is scheduled to start at
    (it's a datetime, format https://en.wikipedia.org/wiki/ISO_8601)`,
    example: `2020-11-22T20:39:12+00:00`,
  })
  @IsDateString()
  readonly scheduled_start: string;

  @ApiProperty({
    description: `the time that the show is scheduled to end at
    (it's a datetime, format https://en.wikipedia.org/wiki/ISO_8601)`,
    example: `2020-11-22T21:39:12+00:00`,
  })
  @IsDateString()
  readonly scheduled_end: string;

  @ApiProperty({
    description: `the display description for customers,
    this should entice users to check out the show`,
    example: `The coolest host with the coolest products will show you
    everything you've been dying to purchase this season`,
  })
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: `show name`,
    example: `The Ski Show - New Ski Bindings Edition`,
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: `the id of the main preview video for the show`,
    example: `1a0e4ba8-f31c-4ad2-ad5c-8ba6d35b7ce7`,
    type: 'UUID',
  })
  @IsOptional()
  @IsUUID()
  readonly video_id?: string;

  @ApiProperty({
    description: `the id of the main preview photo for the show`,
    example: `b644cec4-0487-4f6f-bac1-c80059a2a4b0`,
    type: 'UUID',
  })
  @IsOptional()
  @IsUUID()
  readonly photo_id?: string;
}
