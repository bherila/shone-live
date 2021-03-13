import { IsDateString, IsOptional } from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';

import { CreateShowDto } from './create-show.dto';

export class UpdateShowDto extends PartialType(CreateShowDto) {
  @ApiProperty({
    description:
      `time the show actually ended at` +
      `this must be passed at the time the show ends`,
    example: `2020-11-22T20:39:12+00:00`,
  })
  @IsOptional()
  @IsDateString()
  readonly end: string;
}
