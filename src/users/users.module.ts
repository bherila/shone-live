import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { Product } from 'src/products/entities/product.entity';
import { Show } from 'src/shows/entities/show.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Show, Product])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
