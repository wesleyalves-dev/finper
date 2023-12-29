import { UseCase } from '@core/@shared/use-case'

import { Authenticate, AuthenticateError } from './authenticate'

describe('Authenticate', () => {
  class Test extends UseCase<any, Promise<any>> {
    @Authenticate()
    async execute(_: any, __: any): Promise<any> {
      // Do nothing
    }
  }

  const test = new Test()

  it('espera lançar erro quando os dados de autenticação não forem informados', async () => {
    const input = {}
    const context = {}

    const badFn = async (): Promise<any> => await test.execute(input, context)

    await expect(badFn()).rejects.toThrow(AuthenticateError)
  })

  it('espera lançar erro quando o user não estiver autenticado', async () => {
    const input = {}
    const context = {
      isAuthenticated: false,
      userId: '1',
      token: 'fake-token'
    }

    const badFn = async (): Promise<any> => await test.execute(input, context)

    await expect(badFn()).rejects.toThrow(AuthenticateError)
  })

  it('espera executar corretamente quando o user estiver autenticado', async () => {
    const input = {}
    const context = {
      isAuthenticated: true,
      userId: '1',
      token: 'fake-token'
    }

    await test.execute(input, context)
  })
})
