import { IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class SimpleProductsQueryDto extends PaginationQueryDto {
  @ApiProperty({
    description: `this is the user who created the SimpleProduct`,
    example: `cus_IPqRS333voIGbS`,
  })
  @IsOptional()
  @IsString()
  readonly user_id?: string;
}
