import { PasswordBuilder } from '../test/builders/password.builder'
import { Password } from './password.object-value'

describe('Password', () => {
  const passwordBuilder = new PasswordBuilder()
  const validPassword = 'my-p@ssW0rd!'
  const invalidPassword = 'invalid-password'
  const hash = '$2a$10$wVF8tkhEWO9LmCPzrY4tDeugWK2aMBjz40S9ku2CpHXoM7yoIdHpq'

  describe('create', () => {
    it('espera criar um Password', async () => {
      const withHashOutput = await Password.create({ hash })
      const withPasswordOutput = await Password.create({
        password: validPassword
      })

      expect(withHashOutput).toBeInstanceOf(Password)
      expect(withHashOutput.hash).toEqual(hash)
      expect(withPasswordOutput).toBeInstanceOf(Password)
      expect(withPasswordOutput.hash).toBeDefined()
    })

    it('espera lançar erro de validação', async () => {
      const badEmptyInput = async (): Promise<Password> =>
        await Password.create({})
      const badWeakPassword = async (): Promise<Password> =>
        await Password.create({ password: 'weak' })

      await expect(badEmptyInput).rejects.toThrow('Entity validation failed')
      await expect(badWeakPassword).rejects.toThrow('Entity validation failed')
    })
  })

  describe('verify', () => {
    it('espera verificar uma hash', async () => {
      const password = await passwordBuilder.withHash(hash).build()

      const validPasswordOutput = await password.verify(validPassword)
      const invalidPasswordOutput = await password.verify(invalidPassword)

      expect(validPasswordOutput).toBeTruthy()
      expect(invalidPasswordOutput).toBeFalsy()
    })
  })
})
