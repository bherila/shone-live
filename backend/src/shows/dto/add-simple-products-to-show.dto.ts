import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsUUID } from "class-validator";

export class AddSimpleProductsToShowDto {
  @ApiProperty({
    description: `an array of simpleProduct ids`,
    example:
      `["b644cec4-0487-4f6f-bac1-c80059a2a4b0",` +
      `"4120877e-42f5-11eb-b378-0242ac130002"]`,
    isArray: true,
    type: "UUID"
  })
  @IsArray()
  @IsUUID(4, { each: true })
  simple_product_ids: string[];
}
