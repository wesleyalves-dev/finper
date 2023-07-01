import { Module } from '@nestjs/common'

import { ConfigModule } from './config.module'
import { DatabaseModule } from './database'
import { HealthModule } from './health'
import { SessionModule } from './session'

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, HealthModule, SessionModule]
})
export class AppModule {}
