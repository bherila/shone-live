import { Controller, Get, Param, Post, Body, Patch, Delete, Query, UseGuards } from '@nestjs/common';
import { ShowsService } from './shows.service';
import { CreateShowDto } from './dto/create-show.dto';
import { ShowsQueryDto } from './dto/shows-query.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('shows')
@UseGuards(JwtAuthGuard)
export class ShowsController {
    constructor(private readonly showService: ShowsService) { }

    @Get()
    async findAll(@Query() getShowDto: ShowsQueryDto) {
        return this.showService.findAll(getShowDto);
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
