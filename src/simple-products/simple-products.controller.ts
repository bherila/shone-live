import {
  Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put,
  UseInterceptors,
} from '@nestjs/common';

import { CreateSimpleProductDto } from './dto/create-simple-product.dto';
import { UpdateSimpleProductDto } from './dto/update-simple-product.dto';
import { SimpleProductsService } from './simple-products.service';

@Controller('simple-products')
@UseInterceptors(ClassSerializerInterceptor)
export class SimpleProductsController {
  constructor(private readonly simpleProductsService: SimpleProductsService) {}

  @Post()
  create(@Body() createSimpleProductDto: CreateSimpleProductDto) {
    return this.simpleProductsService.create(createSimpleProductDto);
  }

  @Get()
  findAll() {
    return this.simpleProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.simpleProductsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSimpleProductDto: UpdateSimpleProductDto,
  ) {
    return this.simpleProductsService.update(id, updateSimpleProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.simpleProductsService.remove(id);
  }
}
