import { HttpException } from '@nestjs/common'

import {
  getArgumentsHostMocked,
  getHttpAdapterHostMocked
} from '../@test/mocks'
import { ErrorHandlerFilter } from './error-handler.filter'
import { ApplicationError } from '@core/@shared/application.error'

describe('ErrorHandlerFilter', () => {
  const httpAdapterHostMocked = getHttpAdapterHostMocked()
  const hostMocked = getArgumentsHostMocked()
  const filter = new ErrorHandlerFilter(httpAdapterHostMocked)

  describe('catch', () => {
    it('espera tratar um erro genérico', () => {
      const exception = new Error()

      filter.catch(exception, hostMocked)

      expect(httpAdapterHostMocked.httpAdapter.reply).toBeCalledWith(
        {},
        { message: 'Internal server error' },
        500
      )
    })
  })

  it('espera tratar um http exception', () => {
    const exception = new HttpException('Test', 409)

    filter.catch(exception, hostMocked)

    expect(httpAdapterHostMocked.httpAdapter.reply).toBeCalledWith(
      {},
      { message: 'Test' },
      409
    )
  })

  it('espera tratar um application error', () => {
    const exception = new ApplicationError('Test', 'VALIDATION', {
      test: true
    })

    filter.catch(exception, hostMocked)

    expect(httpAdapterHostMocked.httpAdapter.reply).toBeCalledWith(
      {},
      { message: 'Test', details: { test: true } },
      400
    )
  })
})
