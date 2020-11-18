import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { S3File } from './entities/s3file.entity';
import { S3FilesService } from './s3files.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([S3File])],
  providers: [S3FilesService],
  exports: [S3FilesService],
})
export class S3FilesModule {}
