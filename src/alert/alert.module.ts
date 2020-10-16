import { AlertController } from './alert.controller';
import { AlertGateway } from './alert.gateway';
import { Module } from '@nestjs/common';

@Module({
  providers: [AlertGateway],
  controllers: [AlertController],
})
export class AlertModule {}
