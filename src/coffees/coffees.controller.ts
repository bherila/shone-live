import { Controller, Get, Param } from '@nestjs/common';

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
}
