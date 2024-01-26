import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { Logger } from '@nestjs/common'
import helmet from 'helmet'
import cookies from 'cookie-parser'

import { AppModule } from './app.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  app.use(helmet())
  app.use(cookies())
  const logger = app.get<Logger>('Logger')
  const config = app.get<ConfigService>(ConfigService)
  const port = config.getOrThrow<number>('server.port')
  await app.listen(port)
  logger.log(`Online: ${port}`)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
