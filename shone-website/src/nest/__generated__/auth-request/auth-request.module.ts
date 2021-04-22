/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<3kLOrZC2R1sdh60iY15f1J+N4F2KZcjF>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthRequest } from './auth-request.entity'
import { AuthRequestsRepository } from './auth-request.repository'
import { AuthRequestsResolver } from './auth-request.resolver'
import { AuthRequestsService } from './auth-request.service'

@Module({
  imports: [TypeOrmModule.forFeature([AuthRequest, AuthRequestsRepository])],
  providers: [AuthRequestsService, AuthRequestsResolver],
})
export class AuthRequestsModule {}
