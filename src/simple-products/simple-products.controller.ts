import {
  Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpStatus, Param,
  Post, Put, UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateSimpleProductDto } from './dto/create-simple-product.dto';
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
  findAll() {
    return this.simpleProductsService.findAll();
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
