import { UserInMemoryRepository } from '@core/user/repository/user.in-memory.repository'
import { UserBuilder } from '@core/user/test/builders/user.builder'
import { SessionBuilder } from '@core/user/test/builders/session.builder'
import { AuthenticateError } from '@core/@shared/decorators/authenticate'
import { createContextMocked } from '@core/@test/mocks/context.mock'

import { SignOutUseCase } from './sign-out.use-case'

describe('SignOutUseCase', () => {
  const userRepository = new UserInMemoryRepository()
  const useCase = new SignOutUseCase(userRepository)
  const userBuilder = new UserBuilder()
  const sessionBuilder = new SessionBuilder()

  describe('execute', () => {
    beforeEach(() => {
      userRepository.clean()
    })

    it('espera lançar erro quando não estiver autenticado', async () => {
      const input = {}
      const context = createContextMocked({ isAuthenticated: false })

      const badFn = async (): Promise<any> =>
        await useCase.execute(input, context)

      await expect(badFn()).rejects.toThrow(AuthenticateError)
    })

    it('espera remover a sessão do usuário', async () => {
      const session = await sessionBuilder.build()
      const user = await userBuilder.withSessions([session]).build()
      await userRepository.save(user)
      const input = {}
      const context = createContextMocked({
        isAuthenticated: true,
        session: { userId: user.id.value, refreshToken: session.token.value }
      })

      const output = await useCase.execute(input, context)

      expect(output).toEqual({
        success: true
      })
      expect(user.sessions).toEqual([])
    })
  })
})