import { forwardRef, Module } from '@nestjs/common';

import {
  SimpleProductsModule,
} from '../simple-products/simple-products.module';
import { UsersModule } from '../users/users.module';
import { Stripe2Controller } from './stripe2.controller';
import { Stripe2Service } from './stripe2.service';

@Module({
  imports: [forwardRef(() => SimpleProductsModule), UsersModule],
  controllers: [Stripe2Controller],
  providers: [Stripe2Service],
  exports: [Stripe2Service],
})
export class Stripe2Module {}
