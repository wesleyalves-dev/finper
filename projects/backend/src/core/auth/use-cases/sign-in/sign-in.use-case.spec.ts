import { UserInMemoryRepository } from '@core/user/repository/user.in-memory.repository'
import { UserBuilder } from '@core/user/test/builders/user.builder'
import { PasswordBuilder } from '@core/user/test/builders/password.builder'
import { ValidateInputError } from '@core/@utils/validators'

import { createAccessTokenServiceMocked } from '../../test/access-token-service.mock'
import { SignInUseCase } from './sign-in.use-case'
import { SignInError } from './sign-in.error'

describe('SignInUseCase', () => {
  const userRepository = new UserInMemoryRepository()
  const accessTokenService = createAccessTokenServiceMocked()
  const useCase = new SignInUseCase(userRepository, accessTokenService)
  const userBuilder = new UserBuilder()
  const passwordBuilder = new PasswordBuilder()

  describe('execute', () => {
    beforeEach(() => {
      userRepository.clean()
    })

    it('espera lançar erro de validação quando input estiver incorreto', async () => {
      const input = {
        credentials: {
          username: 'john.doe',
          password: ''
        }
      }

      const badFn = async (): Promise<any> => await useCase.execute(input)

      await expect(badFn()).rejects.toThrow(ValidateInputError)
    })

    it('espera lançar erro quando usuário não existir', async () => {
      const input = {
        credentials: {
          username: 'john.doe@example.com',
          password: 'any_password'
        }
      }

      const badFn = async (): Promise<any> => await useCase.execute(input)

      await expect(badFn()).rejects.toThrow(SignInError.InvalidCredentials)
    })

    it('espera lançar erro quando a senha não bater', async () => {
      const password = await passwordBuilder.build()
      const user = await userBuilder.withPassword(password).build()
      await userRepository.save(user)
      const input = {
        credentials: {
          username: user.username,
          password: 'wrong_password'
        }
      }

      const badFn = async (): Promise<any> => await useCase.execute(input)

      await expect(badFn()).rejects.toThrow(SignInError.InvalidCredentials)
    })

    it('espera gerar os tokens corretamente', async () => {
      const myPassword = '@Ab123!_B9'
      const password = await passwordBuilder.withPassword(myPassword).build()
      const user = await userBuilder
        .withPassword(password)
        .withSessions([])
        .build()
      await userRepository.save(user)
      const input = {
        credentials: {
          username: user.username,
          password: myPassword
        }
      }

      const output = await useCase.execute(input)

      expect(output).toEqual({
        accessToken: expect.any(String),
        refreshToken: expect.any(String)
      })
      expect(user.sessions).toHaveLength(1)
    })
  })
})
