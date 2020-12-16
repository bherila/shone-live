import {
  Body, Controller, Headers, HttpStatus, Post, Req,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';
import {
  CreateCheckoutSessionResponse,
} from './responses/create-checkout-session.response';
import { Stripe2Service } from './stripe2.service';

@Controller('stripe2')
@ApiTags('stripe2')
export class Stripe2Controller {
  constructor(private readonly stripe2Service: Stripe2Service) {}

  @Post('/webhook')
  async stripeEvent(
    @Headers('stripe-signature') signature: any,
    @Req() request: any,
  ) {
    return this.stripe2Service.handleStripeEvent(signature, request);
  }

  @ApiOperation({ summary: `creates a new stripe checkout session` })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: `created a stripe checkout session`,
    type: CreateCheckoutSessionResponse,
  })
  @Post('/create-checkout-session')
  async createCheckoutSession(
    @Body() createCheckoutSessionDto: CreateCheckoutSessionDto,
  ): Promise<CreateCheckoutSessionResponse> {
    return this.stripe2Service
      .createCheckoutSession(createCheckoutSessionDto)
      .then(id => new CreateCheckoutSessionResponse(id));
  }
}
