/**
 * This file is generated. Do not modify it manually.
 *
 * @generated Codelock<<HR1JxZi0FSFXge/tTDdz/NdmUO7BdNme>>
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LoginResponse } from './login-response.entity'
import { LoginResponsesRepository } from './login-response.repository'
import { LoginResponsesResolver } from './login-response.resolver'
import { LoginResponsesService } from './login-response.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([LoginResponse, LoginResponsesRepository]),
  ],
  providers: [LoginResponsesService, LoginResponsesResolver],
})
export class LoginResponsesModule {}
