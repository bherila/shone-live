import { Controller, Post, Body, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { StripeService } from 'src/stripe/stripe.service';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';

@Controller('cards')
export class CardsController {
    constructor(private readonly cardsService: CardsService){}

    // findAll
    // findOne // probably wont need since if ID is known can be used with stripe, but maybe for rendering, probably just use findall for rendering
    // create
    @Post()
    async create(@Body() createCardDto: CreateCardDto){
        return await this.cardsService.create(createCardDto);
    }
    // update
    // destroy
}
