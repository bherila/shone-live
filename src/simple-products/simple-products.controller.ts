import {
  Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpStatus, Param,
  Post, Put, Query, UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateSimpleProductDto } from './dto/create-simple-product.dto';
import { SimpleProductsQueryDto } from './dto/simple-products-query.dto';
import { UpdateSimpleProductDto } from './dto/update-simple-product.dto';
import {
  CreateSimpleProductResponse,
} from './responses/create-simple-product.response';
import { SimpleProductsService } from './simple-products.service';

@Controller('simple-products')
@UseInterceptors(ClassSerializerInterceptor) // needed to run @Exclude()
@ApiTags('simple-products')
export class SimpleProductsController {
  constructor(private readonly simpleProductsService: SimpleProductsService) {}

  @ApiOperation({ summary: `creates a new simple-product` })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: `created a simple-product`,
    type: CreateSimpleProductResponse,
  })
  @Post()
  async create(
    @Body() createSimpleProductDto: CreateSimpleProductDto,
  ): Promise<CreateSimpleProductResponse> {
    const simpleProduct = await this.simpleProductsService.create(
      createSimpleProductDto,
    );
    return new CreateSimpleProductResponse(simpleProduct);
  }

  @Get()
  async findAll(
    @Query() simpleProductsQueryDto: SimpleProductsQueryDto,
  ): Promise<CreateSimpleProductResponse[]> {
    return this.simpleProductsService
      .findAll(simpleProductsQueryDto, ['user', 'show', 'files'])
      .then(simpleProducts => {
        return simpleProducts.map(
          simpleProduct => new CreateSimpleProductResponse(simpleProduct),
        );
      });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.simpleProductsService
      .findOne(id, ['user', 'show', 'files'])
      .then(simpleProduct => {
        return new CreateSimpleProductResponse(simpleProduct);
      });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSimpleProductDto: UpdateSimpleProductDto,
  ): Promise<CreateSimpleProductResponse> {
    return this.simpleProductsService
      .update(id, updateSimpleProductDto)
      .then(simpleProduct => {
        return new CreateSimpleProductResponse(simpleProduct);
      });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.simpleProductsService.remove(id);
  }
}
