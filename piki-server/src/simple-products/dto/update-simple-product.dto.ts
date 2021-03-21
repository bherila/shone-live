import { PartialType } from "@nestjs/swagger";

import { CreateSimpleProductDto } from "./create-simple-product.dto";

export class UpdateSimpleProductDto extends PartialType(
  CreateSimpleProductDto
) {}
