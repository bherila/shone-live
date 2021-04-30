import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'

import { AddressModule } from './address/address.module'
import { BrandsModule } from './brands/brands.module'
import { ConsumerLeadsModule } from './consumer-leads/consumer-leads.module'
import { LineItemsModule } from './line-items/line-items.module'
import { MessageModule } from './message/message.module'
import { OrdersModule } from './orders/orders.module'
import { PaymentModule } from './payment/payment.module'
import { ProductsModule } from './products/products.module'
import { ShowModule } from './show/show.module'
import { ShowSegmentsModule } from './show-segment/show-segments.module'
import { ShowYourStylesModule } from './show-your-style/show-your-style.module'
import { StyleVideoEntryModule } from './show-your-style/show-your-style-video/show-your-style-video.module'
import { SkusModule } from './skus/skus.module'
import { UserModule } from './user/user.module'
import { UserBrandRolesModule } from './user-brand-role/user-brand-roles.module'
import { UserShowRolesModule } from './user-show-role/user-show-roles.module'
import { VariantsModule } from './variants/variants.module'
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        database: process.env.MYSQL_DB,
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
        keepConnectionAlive: true,
      }),
    }),
    AddressModule,
    BrandsModule,
    ConsumerLeadsModule,
    MessageModule,
    LineItemsModule,
    OrdersModule,
    ProductsModule,
    PaymentModule,
    ShowModule,
    ShowSegmentsModule,
    ShowYourStylesModule,
    UserModule,
    UserBrandRolesModule,
    UserShowRolesModule,
    VariantsModule,
    SkusModule,
    StyleVideoEntryModule,
    GraphQLModule.forRoot({
      path: '/api/graphql',
      installSubscriptionHandlers: false,
      autoSchemaFile: process.env.VERCEL
        ? '/tmp/schema.gql'
        : join('public/schema.gql'),
      context: ({ req }) => ({ headers: req.headers }),
      introspection: true,
      playground: true,
      uploads: {
        maxFileSize: 5000000, // 05 MB
        maxFiles: 1,
      },
    }),
  ],
})
export class AppModule {}
