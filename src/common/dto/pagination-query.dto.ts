import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationQueryDto {
    @IsOptional()
    @IsPositive()
    @IsNumber()
    limit: number;

    @IsOptional()
    @Min(0)
    @IsNumber()
    offset: number;
}
