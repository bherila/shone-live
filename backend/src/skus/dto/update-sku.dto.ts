import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateSkuDto {
  @ApiProperty({
    description: `the user who added this sku to the database`,
    example: `cus_IPqRS333voIGbS`
  })
  @IsString()
  readonly user_id: string;

  // todo make it immutable after show starts
  @ApiProperty({
    description: `the id of the product associated with the SKU
      every SKU must currently belong to a product
      this follows the pattern of Stipe, which processes all the unit sales`,
    example: `prod_I7NzQjrlgEJ9ZG`
  })
  @IsOptional()
  @IsString()
  readonly product_id: string;

  // todo make it immutable after show starts
  @ApiProperty({
    description: `the id of the show that the SKU is being sold in
      making SKUs unique to shows controls the quantity and the price
      for that show`,
    example: `1`
  })
  @IsOptional()
  @IsNumber()
  readonly show_id: number;

  @ApiProperty({
    description: `price of the item in cents eg a price of $1 is 100`,
    example: `100`
  })
  @IsOptional()
  @IsNumber()
  readonly price: number;

  // TODO add validation that this cannot be updated before the show starts
  @ApiProperty({
    description: `the time the sku goes live (ie available for purchase),
    currently all skus go live at teh start of the show
    format is ISO 8601 (https://en.wikipedia.org/wiki/ISO_8601)`,
    example: `2020-11-22T20:39:12+00:00`
  })
  @IsOptional()
  @IsDateString()
  readonly active_at: string;

  // TODO add validation that this cannot be updated before the show starts
  @ApiProperty({
    description: `the time the SKU is no longer available for purchase,
    currently there are no purchases allowed after the end of the show
    format is ISO 8601 (https://en.wikipedia.org/wiki/ISO_8601)`,
    example: `2020-11-22T20:39:12+00:00`
  })
  @IsOptional()
  @IsDateString()
  readonly inactive_at: string;

  @ApiProperty({
    description: `any descriptive details that it permutes on
    eg {"size": "medium", "gender": "unisex"}`,
    example: `{"size": "medium"}`
  })
  @IsOptional()
  @IsString()
  readonly attributes?: string;

  // TODO add validation that this cannot be updated after the show starts
  @ApiProperty({
    description: `the quantity at the start of the show,
    this does not get updated as the show goes on
    there is a different field for the current quantity
    called current_quantity. (This is managed by the server based on sales.)`,
    example: `100`
  })
  @IsOptional()
  @IsNumber()
  readonly quantity: number;
}
