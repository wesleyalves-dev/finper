import { UserBuilder } from '../test/builders/user.builder'
import { PasswordBuilder } from '../test/builders/password.builder'
import { SessionBuilder } from '../test/builders/session.builder'

import { UserOutputMapper } from './user-output.mapper'

describe('UserOutputMapper', () => {
  const userBuilder = new UserBuilder()
  const passwordBuilder = new PasswordBuilder()
  const sessionBuilder = new SessionBuilder()
  const mapper = new UserOutputMapper()

  describe('map', () => {
    it('espera mapear um usuário', async () => {
      const password = await passwordBuilder.build()
      const session = await sessionBuilder.build()
      const user = await userBuilder
        .withPassword(password)
        .withSessions([session])
        .build()

      const output = mapper.map(user)

      expect(output).toEqual({
        id: user.id.value,
        fullName: user.fullName,
        document: user.document,
        username: user.username
      })
    })
  })
})
