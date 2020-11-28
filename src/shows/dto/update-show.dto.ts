import { IsDateString, IsOptional } from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';

import { CreateShowDto } from './create-show.dto';

// todo check how this looks from the docs,
// if not working right you can just copy paste the fields and annotate
// or file a bug
export class UpdateShowDto extends PartialType(CreateShowDto) {
  @ApiProperty({
    description: `time the show actually started at`,
    example: `2020-11-22T20:39:12+00:00`,
  })
  @IsOptional()
  @IsDateString()
  readonly start: string;

  @ApiProperty({
    description: `time the show actually ended at`,
    example: `2020-11-22T20:39:12+00:00`,
  })
  @IsOptional()
  @IsDateString()
  readonly end: string;
}
