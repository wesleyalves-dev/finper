import { HttpException } from '@nestjs/common'

import { AppError } from '@core/@shared/app.error'

import { ErrorHandlerFilter } from './error-handler.filter'

describe('ErrorHandlerFilter', () => {
  const httpAdapterHost = {
    httpAdapter: {
      reply: jest.fn()
    }
  }
  const ctx = {
    getRequest: jest.fn(() => ({ url: 'https://exmaple.com' })),
    getResponse: jest.fn(() => ({ text: 'Test' }))
  }
  const argumentsHost = {
    switchToHttp: () => ctx
  }
  const filter = new ErrorHandlerFilter(httpAdapterHost as any)
  const filterProto = Object.getPrototypeOf(filter)

  describe('identifyErrorType', () => {
    it('espera identificar o error type', () => {
      const httpException = new HttpException('Test', 500)
      const appError = new AppError('Test')
      const genericError = new Error('Test')

      const httpExceptionOutput = filterProto.identifyErrorType(httpException)
      const appErrorOutput = filterProto.identifyErrorType(appError)
      const genericErrorOutput = filterProto.identifyErrorType(genericError)

      expect(httpExceptionOutput).toBe('HTTP_EXCEPTION')
      expect(appErrorOutput).toBe('APP_ERROR')
      expect(genericErrorOutput).toBe('GENERIC_ERROR')
    })
  })

  describe('mapAppErrorCode', () => {
    it('espera retornar um status code pelo error code', () => {
      const error = new AppError('Test', 'VALIDATION')

      const output = filterProto.mapAppErrorCode(error)

      expect(output).toBe(400)
    })
  })

  describe('getErrorHandlerByErrorType', () => {
    beforeAll(() => {
      Object.assign(filterProto, {
        mapAppErrorCode: () => 429
      })
    })

    it('espera retornar um error handler pelo error type', () => {
      const fakeError = {
        status: 502,
        statusCode: 404,
        message: 'Test',
        code: 'INTERNAL',
        details: {
          description: 'Test'
        },
        getStatus: () => 401,
        getResponse: () => {}
      }

      const httpExceptionOutput =
        filterProto.getErrorHandlerByErrorType('HTTP_EXCEPTION')(fakeError)
      const appErrorOutput =
        filterProto.getErrorHandlerByErrorType('APP_ERROR')(fakeError)
      const genericErrorOutput =
        filterProto.getErrorHandlerByErrorType('GENERIC_ERROR')(fakeError)

      expect(httpExceptionOutput).toMatchObject({
        statusCode: 401,
        message: 'Test'
      })
      expect(appErrorOutput).toMatchObject({
        statusCode: 429,
        message: 'Test'
      })
      expect(genericErrorOutput).toMatchObject({
        statusCode: 500,
        message: 'Internal Server Error'
      })
    })
  })

  describe('catch', () => {
    it('espera tratar o erro corretamente', () => {
      const error = new Error('Test')

      filter.catch(error, argumentsHost as any)

      expect(httpAdapterHost.httpAdapter.reply).toHaveBeenCalledWith(
        { text: 'Test' },
        {
          details: undefined,
          message: 'Internal Server Error',
          path: 'https://exmaple.com',
          statusCode: 500,
          timestamp: expect.any(String)
        },
        500
      )
      expect(ctx.getRequest).toHaveBeenCalledTimes(1)
      expect(ctx.getResponse).toHaveBeenCalledTimes(1)
    })
  })
})
