import {
  type MiddlewareConsumer,
  Module,
  type NestModule
} from '@nestjs/common'

import { GlobalModule, ConfigModule, LoggerModule } from './modules'
import { ErrorHandlerProvider } from './providers'
import { AuthMiddleware } from './middleware'
import { AuthModule } from './features'

@Module({
  providers: [ErrorHandlerProvider],
  imports: [GlobalModule, ConfigModule.forRoot(), LoggerModule, AuthModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}
