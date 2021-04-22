/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<wKyFR3uMfm/QCdlQcJsRYAwrQkHLah36>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Media } from './media.entity'
import { MediaRepository } from './media.repository'
import { MediaResolver } from './media.resolver'
import { MediaService } from './media.service'

@Module({
  imports: [TypeOrmModule.forFeature([Media, MediaRepository])],
  providers: [MediaService, MediaResolver],
})
export class MediaModule {}
