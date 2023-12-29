import { Module } from '@nestjs/common'

import type { UserRepository } from '@core/user'
import {
  type AccessTokenService,
  RefreshSessionUseCase,
  SignOutUseCase,
  SignInUseCase
} from '@core/auth'

import { AuthController } from './auth.controller'

@Module({
  providers: [
    {
      provide: RefreshSessionUseCase,
      inject: ['UserRepository', 'AccessTokenService'],
      useFactory: (
        userRepository: UserRepository,
        accessTokenService: AccessTokenService
      ) => {
        return new RefreshSessionUseCase(userRepository, accessTokenService)
      }
    },
    {
      provide: SignInUseCase,
      inject: ['UserRepository', 'AccessTokenService'],
      useFactory: (
        userRepository: UserRepository,
        accessTokenService: AccessTokenService
      ) => {
        return new SignInUseCase(userRepository, accessTokenService)
      }
    },
    {
      provide: SignOutUseCase,
      inject: ['UserRepository', 'AccessTokenService'],
      useFactory: (userRepository: UserRepository) => {
        return new SignOutUseCase(userRepository)
      }
    }
  ],
  controllers: [AuthController]
})
export class AuthModule {}
