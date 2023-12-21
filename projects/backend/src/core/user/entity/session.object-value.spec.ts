import { faker } from '@core/@test/utils/faker'

import { SessionBuilder } from '../test/builders/session.builder'
import { Session } from './session.object-value'

describe('Session', () => {
  const sessionBuilder = new SessionBuilder()

  describe('create', () => {
    it('espera criar uma sessão', async () => {
      const newSession = await Session.create({})
      const existentSession = await Session.create(
        {
          token: '659983d4-a8df-54f9-8300-66198a4d2a8d',
          expiresAt: faker.date.future()
        },
        'ec1cd9ed-4309-4cf7-b91c-355d07aa259c'
      )

      expect(newSession).toBeInstanceOf(Session)
      expect(existentSession).toBeInstanceOf(Session)
    })

    it('espera lançar erro de validação', async () => {
      const badFn = async (): Promise<Session> =>
        await Session.create({
          token: 'invalid-token',
          expiresAt: faker.date.past()
        })

      await expect(badFn).rejects.toThrow('Entity validation failed')
    })
  })

  describe('isExpired', () => {
    it('espera saber se a sessão expirou', async () => {
      const date = faker.date.future()
      const notExpiredSession = await sessionBuilder.withExpiresAt(date).build()
      const expiredSession = await sessionBuilder.build()
      Object.assign(expiredSession, { _expiresAt: faker.date.past() })

      expect(notExpiredSession.isExpired).toBeFalsy()
      expect(expiredSession.isExpired).toBeTruthy()
    })
  })
})
