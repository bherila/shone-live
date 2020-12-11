

import { PartialType } from '@nestjs/mapped-types';

import { CreateSimpleProductDto } from './create-simple-product.dto';

export class UpdateSimpleProductDto extends PartialType(
  CreateSimpleProductDto,
) {}
