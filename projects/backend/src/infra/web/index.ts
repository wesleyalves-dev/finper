import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import helmet from 'helmet'
import cookies from 'cookie-parser'

import { AppModule } from './app.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  app.use(helmet())
  app.use(cookies())
  await app.listen(3000)
  const logger = app.get<Logger>('Logger')
  logger.log('Online')
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
