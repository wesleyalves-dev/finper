import {
  type MiddlewareConsumer,
  Module,
  type NestModule
} from '@nestjs/common'

import { GlobalModule } from './global.module'
import { ConfigModule } from './config.module'
import { AuthMiddleware } from './middleware'
import { AuthModule } from './modules'

@Module({
  imports: [GlobalModule, ConfigModule.forRoot(), AuthModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}
