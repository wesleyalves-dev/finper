import { Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { LoggerService } from './logger.service'

@Global()
@Module({
  providers: [
    {
      provide: 'Logger',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return new LoggerService(configService)
      }
    }
  ],
  exports: ['Logger']
})
export class LoggerModule {}
