import {
  Body, Controller, Delete, HttpStatus, Param, Patch, Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateSkuDto } from './dto/create-sku.dto';
import { UpdateSkuDto } from './dto/update-sku.dto';
import { Sku } from './entities/sku.entity';
import { SkusService } from './skus.service';

@ApiTags('skus')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth('JWT')
@Controller('skus')
export class SkusController {
  constructor(private readonly skusService: SkusService) {}

  @ApiOperation({ summary: `creates a new SKU` })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: `creates SKU associated with a product and a show`,
    type: Sku,
  })
  @Post()
  async create(@Body() createSkuDto: CreateSkuDto): Promise<Sku> {
    return this.skusService.create(createSkuDto);
  }

  @ApiOperation({ summary: `updates a SKU, eg their address` })
  @ApiResponse({
    status: HttpStatus.OK,
    description: `updated sku`,
    type: Sku,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSkuDto: UpdateSkuDto,
  ): Promise<Sku> {
    return await this.skusService.update(id, updateSkuDto);
  }

  @ApiOperation({
    summary: `hard deletes a SKU, cascading`,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: `deleted sku`,
    type: Sku,
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Sku> {
    return await this.skusService.remove(id);
  }
}
