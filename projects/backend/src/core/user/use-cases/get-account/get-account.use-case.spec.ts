import { UserInMemoryRepository } from '@core/user/repository'
import { UserBuilder } from '@core/user/test/builders/user.builder'
import { SessionBuilder } from '@core/user/test/builders/session.builder'
import { AuthenticateError } from '@core/@shared/decorators/authenticate'
import { createContextMocked } from '@core/@test/mocks/context.mock'

import { GetAccountUseCase } from './get-account.use-case'

describe('GetAccountUseCase', () => {
  const userRepository = new UserInMemoryRepository()
  const useCase = new GetAccountUseCase(userRepository)
  const userBuilder = new UserBuilder()
  const sessionBuilder = new SessionBuilder()

  describe('execute', () => {
    beforeEach(() => {
      userRepository.clean()
    })

    it('espera lançar erro quando não estiver autenticado', async () => {
      const user = await userBuilder.build()
      await userRepository.save(user)
      const input = {}
      const context = createContextMocked({ isAuthenticated: false })

      const badFn = async (): Promise<any> =>
        await useCase.execute(input, context)

      await expect(badFn).rejects.toThrow(AuthenticateError)
    })

    it('espera retornar os dados da conta de usuário', async () => {
      const session = await sessionBuilder.build()
      const user = await userBuilder.withSessions([session]).build()
      await userRepository.save(user)
      const input = {}
      const context = createContextMocked({
        session: {
          userId: user.id.value,
          refreshToken: session.token.value
        }
      })

      const output = await useCase.execute(input, context)

      expect(output).toEqual({
        data: {
          id: user.id.value,
          fullName: user.fullName,
          document: user.document,
          username: user.username
        }
      })
    })
  })
})
