import { UserInMemoryRepository } from '@core/user/repository/user.in-memory.repository'
import { UserBuilder } from '@core/user/test/builders/user.builder'
import { SessionBuilder } from '@core/user/test/builders/session.builder'
import { ValidateInputError } from '@core/@utils/validators'

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

    it('espera lançar erro quando o input for incorreto', async () => {
      const input = {
        userId: '123',
        refreshToken: '123'
      }

      const badFn = async (): Promise<any> => await useCase.execute(input)

      await expect(badFn).rejects.toThrow(ValidateInputError)
    })

    it('espera remover a sessão do usuário', async () => {
      const session = await sessionBuilder.build()
      const user = await userBuilder.withSessions([session]).build()
      await userRepository.save(user)
      const input = {
        userId: user.id.value,
        refreshToken: session.token.value
      }

      const output = await useCase.execute(input)

      expect(output).toEqual({
        success: true
      })
      expect(user.sessions).toEqual([])
    })
  })
})
