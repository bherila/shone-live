import {
  Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@ApiTags('products')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth('JWT')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: `returns all products` })
  @ApiResponse({
    status: HttpStatus.OK,
    description: `success`,
    type: Product,
    isArray: true,
  })
  @Get()
  async findAll(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<Product[]> {
    const { limit, offset } = paginationQuery;
    return this.productsService.findAll(paginationQuery);
  }

  @ApiOperation({ summary: `returns a product by it's id` })
  @ApiResponse({
    status: HttpStatus.OK,
    description: `success`,
    type: Product,
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @ApiOperation({ summary: `creates a new product` })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: `create product`,
    type: Product,
  })
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({ summary: `updates a product, eg the description` })
  @ApiResponse({
    status: HttpStatus.OK,
    description: `updated product`,
    type: Product,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }

  // todo make sure product cannot be deleted after show starts
  @ApiOperation({
    summary: `hard deletes a product, cascading`,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: `deleted product`,
    type: Product,
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Product> {
    return this.productsService.remove(id);
  }
}
