import { Module, Global, Scope } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import type { DatabaseConfig } from '@config/index'
import { makePostgresDatabase } from '@infra/database'

@Global()
@Module({
  providers: [
    {
      provide: 'Database',
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
  exports: ['Database']
})
export class DatabaseModule {}
