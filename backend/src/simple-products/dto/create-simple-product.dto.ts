import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID
} from "class-validator";

export class CreateSimpleProductDto {
  @ApiProperty({
    description: `the user who added this product to the database`,
    example: `cus_IPqRS333voIGbS`
  })
  @IsString()
  public readonly user_id: string;

  @ApiProperty({
    description: `the show where this product is being sold`,
    example: `b644cec4-0487-4f6f-bac1-c80059a2a4b0`,
    type: "UUID"
  })
  @IsOptional()
  @IsUUID()
  public readonly show_id?: string;

  @ApiProperty({
    description:
      `determines if the product should be shown to the customer` +
      `so they can purchase it` +
      `defaults to false`
  })
  @IsOptional()
  @IsBoolean()
  public readonly available_for_purchase?: boolean;

  @ApiProperty({
    description: `the photo of the product`,
    example: `534f4bac-a095-4fe0-8a35-5220313cd33c`,
    type: "UUID"
  })
  @IsUUID()
  public readonly image_id: string;

  @ApiProperty({
    description: "product name",
    example: `Nike: Fluffy Down Jacket`
  })
  @IsString()
  public readonly name: string;

  @ApiProperty({
    description: "product description",
    example: `Our warmest winter coat designed for outdoor sports like skiing.`
  })
  @IsString()
  public readonly description: string;

  @ApiProperty({
    description: "retail price in cents (eg $1.00 should be 100)",
    example: `100`
  })
  @IsNumber()
  public readonly price: number;

  @ApiProperty({
    description: `quantity available to sell for associated show
    - set once at the start of the show
    - cannot update after show starts (see current_quantity for this)`,
    example: `5`
  })
  @IsNumber()
  public readonly quantity: number;
}