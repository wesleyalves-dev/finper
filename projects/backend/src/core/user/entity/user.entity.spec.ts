import { UserBuilder } from '../test/builders/user.builder'
import { PasswordBuilder } from '../test/builders/password.builder'
import { SessionBuilder } from '../test/builders/session.builder'
import { User } from './user.entity'

describe('User', () => {
  const userBuilder = new UserBuilder()
  const sessionBuilder = new SessionBuilder()
  const passwordBuilder = new PasswordBuilder()

  describe('create', () => {
    it('espera criar um usuário', async () => {
      const session = await sessionBuilder.build()
      const password = await passwordBuilder.build()
      const user = await User.create({
        fullName: 'John Doe',
        document: '16343485082',
        username: 'john.doe@example.com',
        password,
        sessions: [session]
      })

      expect(user).toEqual({
        _id: { _value: expect.any(String) },
        _fullName: 'John Doe',
        _document: '16343485082',
        _username: 'john.doe@example.com',
        _password: { _hash: password.hash },
        _sessions: [session],
        _createdAt: expect.any(Date),
        _updatedAt: expect.any(Date)
      })
    })

    it('espera lançar erro de validação', async () => {
      const password = await passwordBuilder.build()

      const badFn = async (): Promise<User> =>
        await User.create({
          fullName: '',
          document: '123456789',
          username: 'john.doe',
          password,
          sessions: []
        })

      await expect(badFn()).rejects.toThrow('Entity validation failed')
    })
  })

  describe('update', () => {
    it('espera atualizar um usuário', async () => {
      const session = await sessionBuilder.build()
      const password = await passwordBuilder.build()
      const user = await userBuilder
        .withPassword(password)
        .withSessions([session])
        .build()

      await user.update({ fullName: 'New Name' })

      expect(user).toEqual({
        _id: { _value: expect.any(String) },
        _fullName: 'New Name',
        _document: user.document,
        _username: user.username,
        _password: { _hash: password.hash },
        _sessions: [session],
        _createdAt: expect.any(Date),
        _updatedAt: expect.any(Date)
      })
    })
  })
})
