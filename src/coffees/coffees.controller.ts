import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Patch,
    Delete,
    Query
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
    @Get()
    findAll(@Query() paginationQuery) {
        const { limit, offset } = paginationQuery;
        return `TODO: This action should return all coffees. Limit ${limit}, offset: ${offset}`;
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `TODO: This action should return coffee with id ${id}`;
    }

    @Post()
    create(@Body() body) {
        return body;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body) {
        return `TODO: This action should update coffee with id ${id}`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `TODO: This action should remove coffee with id ${id}`;
    }
}
