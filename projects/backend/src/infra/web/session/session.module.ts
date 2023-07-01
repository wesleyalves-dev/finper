import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import type { SessionConfig } from '@config/config'
import {
  type SessionRepository,
  type SessionToken,
  SignInUseCase,
  SignOutUseCase,
  RefreshUseCase,
  SessionPostgresRepository,
  JwtSessionToken
} from '@core/session'
import { type UserRepository, UserPostgresRepository } from '@core/user'
import type { Database } from '@infra/database'

import { SessionController } from './session.controller'

@Module({
  providers: [
    {
      provide: 'SessionRepository',
      useFactory: (database: Database<any>) => {
        return new SessionPostgresRepository(database)
      },
      inject: ['Database']
    },
    {
      provide: 'UserRepository',
      useFactory: (database: Database<any>) => {
        return new UserPostgresRepository(database)
      },
      inject: ['Database']
    },
    {
      provide: 'SessionToken',
      useFactory: (configServer: ConfigService) => {
        const config =
          configServer.getOrThrow<SessionConfig>('resource.session')
        return new JwtSessionToken(config)
      },
      inject: [ConfigService]
    },
    {
      provide: SignInUseCase,
      useFactory: (
        userRepository: UserRepository,
        sessionRepository: SessionRepository,
        sessionToken: SessionToken
      ) => {
        return new SignInUseCase(
          userRepository,
          sessionRepository,
          sessionToken
        )
      },
      inject: ['UserRepository', 'SessionRepository', 'SessionToken']
    },
    {
      provide: SignOutUseCase,
      useFactory: (sessionRepository: SessionRepository) => {
        return new SignOutUseCase(sessionRepository)
      },
      inject: ['SessionRepository']
    },
    {
      provide: RefreshUseCase,
      useFactory: (
        sessionRepository: SessionRepository,
        sessionToken: SessionToken
      ) => {
        return new RefreshUseCase(sessionRepository, sessionToken)
      },
      inject: ['SessionRepository']
    }
  ],
  controllers: [SessionController]
})
export class SessionModule {}
