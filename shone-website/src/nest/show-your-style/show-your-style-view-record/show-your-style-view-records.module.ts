import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ShowYourStyleViewRecord } from './entities/show-your-style-view-record.entity'
import { ShowYourStyleViewRecordsRepository } from './show-your-style-view-records.repository'
import { ShowYourStyleViewRecordsResolver } from './show-your-style-view-records.resolver'
import { ShowYourStyleViewRecordsService } from './show-your-style-view-records.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ShowYourStyleViewRecord,
      ShowYourStyleViewRecordsRepository,
    ]),
  ],
  providers: [
    ShowYourStyleViewRecordsService,
    ShowYourStyleViewRecordsResolver,
  ],
})
export class ShowYourStyleViewRecordsModule {}
