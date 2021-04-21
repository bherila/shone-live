import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

import { PaginationQueryDto } from "../../common/dto/pagination-query.dto";

export class SimpleProductsQueryDto extends PaginationQueryDto {
  @ApiProperty({
    description: `this is the user who created the SimpleProduct`,
    example: `cus_IPqRS333voIGbS`,
  })
  @IsOptional()
  @IsString()
  readonly user_id?: string;

  @ApiProperty({
    description: `this is the show where the SimpleProduct is being sold`,
    example: `8a942359-d28e-469f-96de-64de6e918b8c`,
  })
  @IsOptional()
  @IsString()
  readonly show_id?: string;
}
