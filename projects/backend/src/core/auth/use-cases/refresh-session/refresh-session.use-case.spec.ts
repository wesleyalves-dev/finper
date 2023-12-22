import { UserInMemoryRepository } from '@core/user/repository/user.in-memory.repository'
import { UserBuilder } from '@core/user/test/builders/user.builder'
import { SessionBuilder } from '@core/user/test/builders/session.builder'
import { AuthenticateError } from '@core/@shared/decorators/authenticate'
import type { Context } from '@core/@shared/use-case'
import { faker } from '@core/@test/utils/faker'

import { createAccessTokenServiceMocked } from '../../test/access-token-service.mock'
import { RefreshSessionUseCase } from './refresh-session.use-case'
import { RefreshSessionError } from './refresh-session.error'

describe('RefreshSessionUseCase', () => {
  const userRepository = new UserInMemoryRepository()
  const accessTokenService = createAccessTokenServiceMocked()
  const useCase = new RefreshSessionUseCase(userRepository, accessTokenService)
  const userBuilder = new UserBuilder()
  const sessionBuilder = new SessionBuilder()

  describe('execute', () => {
    beforeEach(() => {
      userRepository.clean()
    })

    it('espera lançar erro não estiver autenticado', async () => {
      const input = {}
      const context = {
        isAuthenticated: false,
        session: {
          userId: 'any_user_id',
          refreshToken: 'any_refresh_token'
        }
      }

      const badFn = async (): Promise<any> =>
        await useCase.execute(input, context as Context)

      await expect(badFn).rejects.toThrow(AuthenticateError)
    })

    it('espera lançar erro quando a sessão não for encontrada', async () => {
      const session = {
        token: { value: '491626cd-7e2d-50aa-b254-48f25873ce0c' }
      }
      const user = await userBuilder.withSessions([]).build()
      await userRepository.save(user)
      const input = {}
      const context = {
        isAuthenticated: true,
        session: {
          userId: user.id.value,
          refreshToken: session.token.value
        }
      }

      const badFn = async (): Promise<any> =>
        await useCase.execute(input, context as Context)

      await expect(badFn).rejects.toThrow(RefreshSessionError.InvalidSession)
    })

    it('espera lançar erro quando a sessão estiver expirada', async () => {
      const expiresAt = faker.date.past()
      const session = await sessionBuilder.build()
      Object.assign(session, { _expiresAt: expiresAt })
      const user = await userBuilder.withSessions([session]).build()
      await userRepository.save(user)
      const input = {}
      const context = {
        isAuthenticated: true,
        session: {
          userId: user.id.value,
          refreshToken: session.token.value
        }
      }

      const badFn = async (): Promise<any> =>
        await useCase.execute(input, context as Context)

      await expect(badFn).rejects.toThrow(RefreshSessionError.SessionExpired)
    })

    it('espera retornar o token de acesso', async () => {
      const expiresAt = faker.date.future()
      const session = await sessionBuilder.withExpiresAt(expiresAt).build()
      const user = await userBuilder.withSessions([session]).build()
      await userRepository.save(user)
      const input = {}
      const context = {
        isAuthenticated: true,
        session: {
          userId: user.id.value,
          refreshToken: session.token.value
        }
      }

      const output = await useCase.execute(input, context as Context)

      expect(output).toEqual({
        accessToken: 'fake-access-token'
      })
    })
  })
})
