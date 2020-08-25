import { Module } from '@nestjs/common';
import { ShowsController } from './shows.controller';
import { ShowsService } from './shows.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Show } from './entities/show.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Show, User])],
    controllers: [ShowsController],
    providers: [ShowsService],
})
export class ShowsModule { }
