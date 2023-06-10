import { Module } from '@nestjs/common'

import { ConfigModule } from './config.module'
import { DatabaseModule } from './database'
import { HealthModule } from './health'

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, HealthModule]
})
export class AppModule {}
