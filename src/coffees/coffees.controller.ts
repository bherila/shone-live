import { Controller, Get } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
    @Get()
    findAll() {
        return 'TODO: This action should return all coffees';
    }
}
