import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CardsService } from "./cards.service";
import { CreateCardDto } from "./dto/create-card.dto";
import { Card } from "./entities/card.entity";

@ApiTags("cards")
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth('JWT')
@Controller("cards")
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @ApiOperation({
    summary: `takes the card id created by stripe and saves it on the user`,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: `save the stripe card id on the user`,
    type: Card,
  })
  @Post()
  async create(@Body() createCardDto: CreateCardDto): Promise<Card> {
    return await this.cardsService.create(createCardDto);
  }
}
