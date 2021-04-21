import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class StripeAddress {
  @ApiProperty({
    description: `the city name`,
    example: `New York`,
  })
  @IsString()
  city: string;

  @ApiProperty({
    description: `Standard 2 character country abbreviation,
    currently we only support US`,
    example: `US`,
  })
  @IsString()
  country: string;

  @ApiProperty({
    description: `Full street address information, number and street name`,
    example: `1 Broadway`,
  })
  @IsString()
  line1: string;

  @ApiProperty({
    description: `Second address line often used for the unit number`,
    example: `Suite 1000`,
  })
  @IsOptional()
  @IsString()
  line2?: string;

  @ApiProperty({
    description: `5 digit standard postal code`,
    example: `10004`,
  })
  @IsString()
  postal_code: string;

  @ApiProperty({
    description: `2 leter standard state abbreviation`,
    example: `NY`,
  })
  @IsString()
  state: string;
}
