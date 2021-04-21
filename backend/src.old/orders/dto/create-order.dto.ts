import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

import { StripeAddress } from "../../stripe/dto/stripe-address.dto";

export class CreateOrderDto {
  // todo server returns error if quantity requested is more than what's left
  // client should also manage this as well
  @ApiProperty({
    description: `the number of units the customer would like to order`,
    example: `5`,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: `the shipping address for the order,
    billing address is saved on the card and something separate`,
    example: {
      city: "New York",
      country: "US",
      line1: "1 Broadway",
      line2: "Suite 1000",
      postal_code: "10004",
      state: "NY",
    },
    type: StripeAddress,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => StripeAddress)
  readonly shipping: StripeAddress;

  @ApiProperty({
    description: `a valid email for the receipt
    originally users could not be created without receipt
    so this was marked optional,
    for now we just need to make sure it's passed and can deal with caching`,
    example: `myemail@gmail.com`,
  })
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty({
    description: `the name of the recipient of the order
    also optional, if not passed user name is used`,
    example: `John Smith`,
  })
  @IsOptional()
  @IsString()
  shipping_name: string;

  @ApiProperty({
    description: `right now one sku can be passed at a time`,
    example: `sku_IRMW5E3niKt154`,
  })
  @IsString()
  sku: string;

  @ApiProperty({
    description: `the id of the stripe card being used to pay for the order`,
    example: `card_1HqnEC2eZvKYlo2Cs3wf41sM`,
  })
  @IsString()
  card_id: string;

  @ApiProperty({
    description: `the id of the user making the purchase`,
    example: `cus_IPqRS333voIGbS`,
  })
  @IsString()
  user_id: string;

  @ApiProperty({
    description: `id of the show which the order is being made from
    will be used in the future as a sanity check that the sku is right`,
    example: `1`,
  })
  @IsNumber()
  show_id: number;
}
