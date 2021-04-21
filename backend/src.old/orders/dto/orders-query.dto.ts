import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

import { PaginationQueryDto } from "../../common/dto/pagination-query.dto";

export class OrdersQueryDto extends PaginationQueryDto {
  @ApiProperty({
    description: `filter the orders by the show they were placed from`,
    example: `1`,
  })
  @IsOptional()
  @IsString()
  readonly show_id?: string;
}
