import { UserInMemoryRepository } from '@core/user/repository'

import { SessionInMemoryRepository } from '../../repository'
import { createSessionTokenMocked } from '../../test/session-token-mocked'
import { user, password } from '../../test/user'
import { SignInUseCase } from './sign-in.use-case'

describe('SignInUseCase', () => {
  const userRepository = new UserInMemoryRepository()
  const sessionRepository = new SessionInMemoryRepository()
  const sessionTokenMocked = createSessionTokenMocked({
    signOutput: { accessToken: 'fake-token' },
    verifyOutput: { payload: { userId: '123' } }
  })
  const signInUserCase = new SignInUseCase(
    userRepository,
    sessionRepository,
    sessionTokenMocked
  )
  const { username } = user

  describe('execute', () => {
    it('espera lançar um erro quando o usuário não existir', async () => {
      const input = {
        credential: {
          username,
          password
        }
      }

      const badFn = async (): Promise<any> =>
        await signInUserCase.execute(input)

      await expect(badFn()).rejects.toThrow(
        expect.objectContaining({
          message: 'User or password incorrect',
          code: 'AUTHENTICATION'
        })
      )
      expect(sessionTokenMocked.sign).not.toBeCalled()
    })

    it('espera lançar um erro quando a senha estiver incorreta', async () => {
      await userRepository.save(user)
      const input = {
        credential: {
          username,
          password: 'incorrect-password'
        }
      }

      const badFn = async (): Promise<any> =>
        await signInUserCase.execute(input)

      await expect(badFn()).rejects.toThrow(
        expect.objectContaining({
          message: 'User or password incorrect',
          code: 'AUTHENTICATION'
        })
      )
      expect(sessionTokenMocked.sign).not.toBeCalled()
    })

    it('espera retornar um objeto com os tokens de autorização', async () => {
      await userRepository.save(user)
      const input = {
        credential: {
          username,
          password
        }
      }

      const output = await signInUserCase.execute(input)

      expect(output).toMatchObject({
        data: {
          accessToken: 'fake-token',
          refreshToken: expect.any(String)
        }
      })
      expect(sessionTokenMocked.sign).toBeCalledTimes(1)
    })
  })
})
