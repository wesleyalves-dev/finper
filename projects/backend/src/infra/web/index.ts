import { NestFactory, HttpAdapterHost } from '@nestjs/core'
import helmet from 'helmet'
import cookies from 'cookie-parser'

import { AppModule } from './app.module'
import { ErrorHandlerFilter } from './@filters/error-handler.filter'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  const adapterHost = app.get(HttpAdapterHost)
  const errorHandler = new ErrorHandlerFilter(adapterHost)
  app.use(helmet())
  app.use(cookies())
  app.useGlobalFilters(errorHandler)
  await app.listen(3000)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
