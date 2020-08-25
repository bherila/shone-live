import { Controller, Get, Param, Post, Body, Patch, Delete, Query, NotFoundException } from '@nestjs/common';
import { ShowsService } from './shows.service';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('shows')
export class ShowsController {
    constructor(private readonly showService: ShowsService) { }

    @Get()
    async findAll(@Query() paginationQuery: PaginationQueryDto) {
        const { limit, offset } = paginationQuery;
        return this.showService.findAll(paginationQuery);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.showService.findOne(id);
    }

    @Post()
    create(@Body() createShowDto: CreateShowDto) {
        return this.showService.create(createShowDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateShowDto: UpdateShowDto) {
        return this.showService.update(id, updateShowDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.showService.remove(id);
    }
}
