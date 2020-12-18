import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

import { ApiProperty, PartialType } from '@nestjs/swagger';

export class SimpleProductsQueryDto extends PartialType(PaginationQueryDto) {
  @ApiProperty({
    description: `this is the user who created the SimpleProduct`,
    example: `cus_IPqRS333voIGbS`,
  })
  @IsOptional()
  @IsString()
  readonly user_id?: string;
}
