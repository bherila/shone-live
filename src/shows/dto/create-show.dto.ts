import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

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
    description: `this should inclue the time that the show starts at
    (it's a datetime, format https://en.wikipedia.org/wiki/ISO_8601)`,
    example: `2020-11-22T20:39:12+00:00`,
  })
  @IsDateString()
  readonly date: string;

  @ApiProperty({
    description: `expected length of the show in seconds.
    (currently no enforcement of endtime)`,
    example: `3600`,
  })
  @IsNumber()
  readonly length: number;

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
    example: `1`,
  })
  @IsOptional()
  @IsNumber()
  readonly previewId: number;
}
