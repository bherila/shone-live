import { IsDateString, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class ShowsQueryDto extends PaginationQueryDto {
  @ApiProperty({
    description: `this is the user who created the show`,
    example: `cus_IPqRS333voIGbS`,
  })
  @IsOptional()
  @IsString()
  readonly user_id?: string;

  @ApiProperty({
    description: `earlierst start date-time of show to query INCLUSIVE
     https://en.wikipedia.org/wiki/ISO_8601
     can be passed with end as a range,
     or passed alone to return all records after
     note this currently has no logical validation eg that format is correct
     that date is reasonable, that start is before end, that is a TODO, so for now please use carefully`,
    example: `2020-11-22T20:39:12+00:00`,
  })
  @IsOptional()
  @IsDateString()
  readonly start?: string;

  @ApiProperty({
    description: `latest start date-time of show to query INCLUSIVE
     https://en.wikipedia.org/wiki/ISO_8601
     can be passed with start as a range,
     or passed alone to return all records before
     note this currently has no logical validation eg that format is correct
     that date is reasonable, that start is before end, that is a TODO, so for now please use carefully`,
    example: `2020-11-22T20:39:12+00:00`,
  })
  @IsOptional()
  @IsDateString()
  readonly end?: string;
}
