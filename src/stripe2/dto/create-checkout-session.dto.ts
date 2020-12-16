import { IsNumber, IsString, IsUUID } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateCheckoutSessionDto {
  @ApiProperty({
    description: `the id of the user who wishes to make a purchase`,
    example: `cus_IPqRS333voIGbS`,
  })
  @IsString()
  public readonly user_id: string;

  @ApiProperty({
    description: `the id of the product the user wishes to purchase`,
    example: `408f3299-a0ac-4664-bc78-b329ad37e087`,
    type: 'UUID',
  })
  @IsUUID()
  public readonly simple_product_id: string;

  @ApiProperty({
    description: `the number of units the user wishes to purchase`,
    example: `1`,
  })
  @IsNumber()
  public readonly quantity: number;
}
