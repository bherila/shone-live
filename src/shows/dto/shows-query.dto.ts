import { IsOptional, IsString } from "class-validator";

import { PaginationQueryDto } from "src/common/dto/pagination-query.dto";

export class ShowsQueryDto extends PaginationQueryDto {
    @IsOptional()
    @IsString()
    readonly userId: string;
}
