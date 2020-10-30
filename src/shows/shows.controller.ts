import {
  Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateShowDto } from './dto/create-show.dto';
import { ShowsQueryDto } from './dto/shows-query.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { ShowsService } from './shows.service';

@ApiTags('shows')
@Controller('shows')
@ApiBearerAuth() // TODO check this,
// but these should show wherever there's auth gaurd on route in swatgger docs
// and then we should add this everywhere we add gaurd
@UseGuards(JwtAuthGuard) // TODO add guard everywhere it's applicable
//                          (ie most routes)
export class ShowsController {
  constructor(private readonly showService: ShowsService) {}

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
