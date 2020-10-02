import { Module } from '@nestjs/common';
import { ShowsController } from './shows.controller';
import { ShowsService } from './shows.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Show } from './entities/show.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { Sku } from 'src/skus/entities/sku.entity';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Show,
            User,
            Product,
            Sku
        ]),
        StripeModule,
    ],
    controllers: [ShowsController],
    providers: [ShowsService],
})
export class ShowsModule { }
