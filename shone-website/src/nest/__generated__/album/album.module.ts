/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<Xm8e47ueh1WrOGAmFopgJniQvu7QH3mD>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AlbumsRepository } from './album.repository'
import { AlbumsResolver } from './album.resolver'
import { AlbumsService } from './album.service'
import { Album } from './album.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Album, AlbumsRepository])],
  providers: [AlbumsService, AlbumsResolver],
})
export class AlbumsModule {}
