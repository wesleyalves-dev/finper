import { SessionInMemoryRepository } from '@core/session/repository/session.in-memory.repository'
import { session, expiredSession } from '@core/session/test/session'
import { createSessionTokenMocked } from '@core/session/test/session-token-mocked'
import { RefreshUseCase } from './refresh.use-case'

describe('RefreshUseCase', () => {
  const sessionRepository = new SessionInMemoryRepository()
  const sessionTokenMocked = createSessionTokenMocked({
    signOutput: { accessToken: 'fake-token' },
    verifyOutput: { payload: {} }
  })
  const refreshUseCase = new RefreshUseCase(
    sessionRepository,
    sessionTokenMocked
  )

  describe('execute', () => {
    it('espera lançar um erro quando a sessão estiver expirada', async () => {
      await sessionRepository.save(expiredSession)
      const input = { refreshToken: expiredSession.id.value }

      const badFn = async (): Promise<any> =>
        await refreshUseCase.execute(input)

      await expect(badFn()).rejects.toThrow(
        expect.objectContaining({
          code: 'AUTHENTICATION',
          message: 'Session is expired'
        })
      )
    })

    it('espera retornar um objeto com os tokens de acesso e de atualização', async () => {
      await sessionRepository.save(session)
      const input = { refreshToken: session.id.value }

      const output = await refreshUseCase.execute(input)

      expect(output).toMatchObject({
        data: {
          accessToken: 'fake-token',
          refreshToken: session.id.value
        }
      })
    })
  })
})
