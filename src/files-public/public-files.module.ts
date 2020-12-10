import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PublicFile } from './entities/public-file.entity';
import { PublicFilesService } from './public-files.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([PublicFile])],
  providers: [PublicFilesService],
  exports: [PublicFilesService],
})
export class PublicFilesModule {}
