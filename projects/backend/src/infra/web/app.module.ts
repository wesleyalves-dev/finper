import { Module } from '@nestjs/common'

import { ConfigModule } from './config.module'
import { HealthController } from './health'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [HealthController]
})
export class AppModule {}
