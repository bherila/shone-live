import { Body, Controller, Post } from '@nestjs/common';

import { CreateSkuDto } from './dto/create-sku.dto';
import { SkusService } from './skus.service';

@Controller('skus')
export class SkusController {
  constructor(private readonly skusService: SkusService) {}

  @Post()
  create(@Body() createSkuDto: CreateSkuDto) {
    return this.skusService.create(createSkuDto);
  }
}
