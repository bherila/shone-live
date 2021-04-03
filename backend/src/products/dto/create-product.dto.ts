import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
  @ApiProperty({
    description: `the user who added this product to the database
    currently each user only has access to their own product category,
    so the same product may exist for multiple users`,
    example: `cus_IPqRS333voIGbS`,
  })
  @IsString()
  readonly user_id: string;

  @ApiProperty({
    description: `the show where this product first shows up,
    can exist in multiple shows
    unlike SKUs which only have a life of one show`,
    example: `1`,
  })
  @IsNumber()
  readonly show_id: number;

  @ApiProperty({
    description: `this is the overall product name`,
    example: `nike pro sweat shirt`,
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: `the product description for display to the customer`,
    example: `this model of sweatshirt that has the most stretch
    and performance of any fabric that Nike offers, perfect for long runs`,
  })
  @IsString()
  readonly description: string;
}
