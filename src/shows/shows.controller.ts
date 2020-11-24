import {
  Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth, ApiOperation, ApiResponse, ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateShowDto } from './dto/create-show.dto';
import { ShowsQueryDto } from './dto/shows-query.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { Show } from './entities/show.entity';
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

  @ApiOperation({ summary: `returns all shows` })
  @ApiResponse({
    status: HttpStatus.OK,
    description: `success`,
    type: Show,
    isArray: true,
  })
  @Get()
  async findAll(@Query() getShowDto: ShowsQueryDto): Promise<Show[]> {
    return this.showService.findAll(getShowDto);
  }

  @ApiOperation({ summary: `returns a single show by its id` })
  @ApiResponse({
    status: HttpStatus.OK,
    description: `success`,
    type: Show,
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Show> {
    return this.showService.findOne(id);
  }

  @ApiOperation({ summary: `creates a new show` })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: `created show`,
    type: Show,
  })
  @Post()
  async create(@Body() createShowDto: CreateShowDto): Promise<Show> {
    return this.showService.create(createShowDto);
  }

  @ApiOperation({
    summary: `updates a show, eg the start date/time
    although request body listed as required, feilds are just example fields
    any subset can be sent (they aren't all needed)`,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: `updated show`,
    type: Show,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateShowDto: UpdateShowDto,
  ): Promise<Show> {
    return this.showService.update(id, updateShowDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Show> {
    return this.showService.remove(id);
  }
}
