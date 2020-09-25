import { Controller, Post, Body } from '@nestjs/common';
import { SkusService } from './skus.service';
import { CreateSkuDto } from './dto/create-sku.dto';

@Controller('skus')
export class SkusController {
    constructor(private readonly skusService: SkusService) { }

    @Post()
    create(@Body() createSkuDto: CreateSkuDto) {
        return this.skusService.create(createSkuDto);
    }
}
