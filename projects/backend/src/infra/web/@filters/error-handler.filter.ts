import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'

import { ApplicationError } from '@core/@shared/application.error'

import { errorCodeToStatusCode } from '../@utils/errors'

interface HandleExceptionOutput {
  status: number
  message: string
  details?: any
}

@Catch()
export class ErrorHandlerFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  private handleException(exception: any): HandleExceptionOutput {
    const status =
      exception.getStatus?.() ?? errorCodeToStatusCode(exception.code)
    const message = status === 500 ? 'Internal server error' : exception.message
    const details =
      exception instanceof ApplicationError ? exception.details : undefined

    return {
      status,
      message,
      details
    }
  }

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost
    const ctx = host.switchToHttp()
    const { status, message, details } = this.handleException(exception)

    httpAdapter.reply(ctx.getResponse(), { message, details }, status)
  }
}
