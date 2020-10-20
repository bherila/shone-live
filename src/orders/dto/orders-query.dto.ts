import { IsNumber, IsOptional } from 'class-validator';

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class OrdersQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsNumber()
  readonly showId: number;
}
