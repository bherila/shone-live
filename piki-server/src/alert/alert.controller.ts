import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AlertGateway } from './alert.gateway';

@ApiTags('alert')
@Controller('alert')
export class AlertController {
  constructor(private alertGateway: AlertGateway) {}

  @Post()
  @HttpCode(200) // otherwise post returns 201 created, which isn't true here
  sendAlertToAll(@Body() dto: { message: string }) {
    this.alertGateway.sendToAll(dto.message);
    return dto;
  }
}