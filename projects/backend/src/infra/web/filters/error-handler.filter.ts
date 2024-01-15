import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  Inject,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import type { Request } from 'express'

import { AppError } from '@core/@shared/app.error'

type ErrorType = 'HTTP_EXCEPTION' | 'APP_ERROR' | 'GENERIC_ERROR'

interface ErrorInfo {
  statusCode: number
  message?: string
  details?: any
}

type ErrorHandler = (error: any) => ErrorInfo

@Catch()
export class ErrorHandlerFilter implements ExceptionFilter {
  constructor(
    @Inject(HttpAdapterHost)
    private readonly httpAdapterHost: HttpAdapterHost
  ) {}

  private identifyErrorType(exception: any): ErrorType {
    if (exception instanceof HttpException) return 'HTTP_EXCEPTION'

    if (exception instanceof AppError) return 'APP_ERROR'

    return 'GENERIC_ERROR'
  }

  private mapAppErrorCode(error: AppError): number {
    const codes = {
      INTERNAL: HttpStatus.INTERNAL_SERVER_ERROR,
      VALIDATION: HttpStatus.BAD_REQUEST,
      AUTHENTICATION: HttpStatus.UNAUTHORIZED,
      UNAUTHORIZED: HttpStatus.FORBIDDEN
    }

    return codes[error.code]
  }

  private getErrorHandlerByErrorType(errorType: ErrorType): ErrorHandler {
    const handlers = {
      HTTP_EXCEPTION: (exception: HttpException) => {
        const statusCode = exception.getStatus()
        const message = exception.message

        return {
          statusCode,
          message
        }
      },
      APP_ERROR: (error: AppError) => {
        const statusCode = this.mapAppErrorCode(error)
        const message = error.message
        const details = error.details

        return {
          statusCode,
          message,
          details
        }
      },
      GENERIC_ERROR: () => {
        const statusCode = 500
        const message = 'Internal Server Error'

        return {
          statusCode,
          message
        }
      }
    }

    return handlers[errorType]
  }

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<Request>()
    const errorType = this.identifyErrorType(exception)
    const handler = this.getErrorHandlerByErrorType(errorType)
    const timestamp = new Date().toISOString()
    const path = request.url
    const {
      statusCode,
      message = 'Internal Server Error',
      details
    } = handler(exception)

    const body = {
      statusCode,
      timestamp,
      path,
      message,
      details
    }

    httpAdapter.reply(ctx.getResponse(), body, statusCode)
  }
}
