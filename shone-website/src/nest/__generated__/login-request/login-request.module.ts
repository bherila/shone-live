/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<FkJLKAGerbeLSPwXCY7raqcfJgZOxvtW>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LoginRequest } from './login-request.entity'
import { LoginRequestsRepository } from './login-request.repository'
import { LoginRequestsResolver } from './login-request.resolver'
import { LoginRequestsService } from './login-request.service'

@Module({
  imports: [TypeOrmModule.forFeature([LoginRequest, LoginRequestsRepository])],
  providers: [LoginRequestsService, LoginRequestsResolver],
})
export class LoginRequestsModule {}
