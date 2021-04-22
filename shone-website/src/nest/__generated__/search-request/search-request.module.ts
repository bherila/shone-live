/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<Obn1EuxE0sz7P4GlsWDuNlEUfKP6uk22>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SearchRequest } from './search-request.entity'
import { SearchRequestsRepository } from './search-request.repository'
import { SearchRequestsResolver } from './search-request.resolver'
import { SearchRequestsService } from './search-request.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([SearchRequest, SearchRequestsRepository]),
  ],
  providers: [SearchRequestsService, SearchRequestsResolver],
})
export class SearchRequestsModule {}
