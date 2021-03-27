import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationQueryDto {
  @ApiProperty({
    description: `this is the maximum number of records to return
    sending in enables pagination
    if sent requires offset to be sent with it`,
    example: `5`
  })
  @IsOptional()
  @IsPositive()
  @IsNumber()
  limit?: number;

  @ApiProperty({
    description: `this is the number of records to skip
    eg if pagination is 5, sending in offset 10 will
    get you records 11,12,13,14,15`,
    example: `5`
  })
  @IsOptional()
  @Min(0)
  @IsNumber()
  offset?: number;
}
