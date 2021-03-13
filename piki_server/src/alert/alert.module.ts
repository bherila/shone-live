import { Module } from '@nestjs/common';

import { AlertController } from './alert.controller';
import { AlertGateway } from './alert.gateway';

@Module({
  providers: [AlertGateway],
  controllers: [AlertController],
})
export class AlertModule {}
