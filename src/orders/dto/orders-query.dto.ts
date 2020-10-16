import { IsNumber, IsOptional, IsString } from "class-validator";

import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";

export class OrdersQueryDto extends PaginationQueryDto {
    @IsOptional()
    @IsNumber()
    readonly showId: number;
}
