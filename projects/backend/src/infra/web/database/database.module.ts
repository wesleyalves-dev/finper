import { Module, Scope } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import type { DatabaseConfig } from '@config/index'
import { makePostgresDatabase } from '@infra/database'

@Module({
  providers: [
    {
      provide: 'DatabaseModule',
      scope: Scope.TRANSIENT,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const config = configService.getOrThrow<DatabaseConfig>('database')
        const database = makePostgresDatabase(config)
        await database.connect()
        return database
      }
    }
  ],
  exports: ['DatabaseModule']
})
export class DatabaseModule {}
