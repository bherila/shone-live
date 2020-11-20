import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/entities/user.entity';
import PrivateFile from './entities/private-file.entity';
import { PrivateFilesService } from './private-files.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, PrivateFile]), ConfigModule],
  providers: [PrivateFilesService],
  exports: [PrivateFilesService],
})
export class PrivateFilesModule {}
