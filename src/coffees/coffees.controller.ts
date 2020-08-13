import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Patch,
    Delete
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
    @Get()
    findAll() {
        return 'TODO: This action should return all coffees';
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
