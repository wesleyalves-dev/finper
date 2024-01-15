import type { Provider } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'

import { ErrorHandlerFilter } from '../filters'

export const ErrorHandlerProvider: Provider = {
  provide: APP_FILTER,
  useClass: ErrorHandlerFilter
}
