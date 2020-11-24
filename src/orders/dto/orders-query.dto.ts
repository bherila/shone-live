import { IsNumber, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class OrdersQueryDto extends PaginationQueryDto {
  @ApiProperty({
    description: `filter the orders by the show they were placed from`,
    example: `1`,
  })
  @IsOptional()
  @IsNumber()
  readonly show_id: number;
}
