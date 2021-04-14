import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'

import { AddressModule } from './address/address.module'
import { Address } from './address/entities/address.entity'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConsumerLeadsModule } from './consumer-leads/consumer-leads.module'
import { ConsumerLead } from './consumer-leads/entities/consumer-lead.entity'
import { HelloModule } from './hello/hello.module'
import { MessageEntity } from './message/entities/message.entity'
import { MessageModule } from './message/message.module'
import { Payment } from './payment/entities/payment.entity'
import { PaymentModule } from './payment/payment.module'
import { Product } from './products/entities/product.entity'
import { ProductsModule } from './products/products.module'
import { Show } from './show/entities/show.entity'
import { ShowModule } from './show/show.module'
import { User } from './user/entities/user.entity'
import { UserModule } from './user/user.module'
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        database: process.env.MYSQL_DB,
        entities: [
          Address,
          ConsumerLead,
          MessageEntity,
          Product,
          Payment,
          Show,
          User,
        ],
        autoLoadEntities: true,
        synchronize: true,
        logging: false,
        keepConnectionAlive: true,
      }),
    }),
    AddressModule,
    ConsumerLeadsModule,
    HelloModule,
    MessageModule,
    ProductsModule,
    PaymentModule,
    ShowModule,
    UserModule,
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
