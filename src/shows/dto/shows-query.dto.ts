import { IsDateString, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

// TODO this should use extends PartialType from nestjs/swagger
// however if that is used then
// the class validator breaks on the inherited params
// so it cannot work, but if it's not used
// the swagger docs wrongly state the optional params are required
// https://stackoverflow.com/questions/64376439/nestjs-dto-extended-with-partialtype-breaks-validation
export class ShowsQueryDto extends PaginationQueryDto {
  @ApiProperty({
    description: `this is the user who created the show`,
  })
  @IsOptional()
  @IsString()
  readonly userId: string;

  // TODO: start date and end date both need validation
  // that if one is present both need to be present
  // or update the code to retur all after date or all before date
  // also there is no logical validation on the dates to show start and end
  @ApiProperty({
    description: `earlierst start date-time of show to query INCLUSIVE
     https://en.wikipedia.org/wiki/ISO_8601
     note this currently has no logical validation eg that format is correct
     that date is reasonable, that start is before end, that is a TODO, so for now please use carefully`,
  })
  @IsOptional()
  @IsDateString()
  readonly startDate: string;

  // TODO: start date and end date both need validation
  // that if one is present both need to be present
  // or update the code to retur all after date or all before date
  // also there is no logical validation on the dates to show start and end
  @ApiProperty({
    description: `latest start date-time of show to query INCLUSIVE
     https://en.wikipedia.org/wiki/ISO_8601
     note this currently has no logical validation eg that format is correct
     that date is reasonable, that start is before end, that is a TODO, so for now please use carefully`,
  })
  @IsOptional()
  @IsDateString()
  readonly endDate: string;
}
