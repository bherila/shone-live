import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateSkuDto } from './dto/create-sku.dto';
import { SkusService } from './skus.service';

@ApiTags('skus')
@Controller('skus')
export class SkusController {
  constructor(private readonly skusService: SkusService) {}

  @Post()
  create(@Body() createSkuDto: CreateSkuDto) {
    return this.skusService.create(createSkuDto);
  }
}
