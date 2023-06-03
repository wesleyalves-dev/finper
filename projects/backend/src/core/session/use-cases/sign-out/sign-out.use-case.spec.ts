import { SessionInMemoryRepository } from '../../repository/session.in-memory.repository'
import { session } from '../../test/session'
import { SignOutUseCase } from './sign-out.use-case'

describe('SignOutUseCase', () => {
  const sessionRepository = new SessionInMemoryRepository()
  const signOutUseCase = new SignOutUseCase(sessionRepository)

  describe('execute', () => {
    it('espera a sessão', async () => {
      await sessionRepository.save(session)
      const input = { refreshToken: session.id.value }

      const output = await signOutUseCase.execute(input)

      expect(output).toMatchObject({ success: true })
      expect(sessionRepository.sessions).toMatchObject([])
    })
  })
})
