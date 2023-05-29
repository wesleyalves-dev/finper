import { Id } from '@core/@shared/id.object-value'
import { Session } from './session.entity'

describe('Session', () => {
  const id = 'c4600e53-9680-4c0b-94d9-bff064df7e74'
  const data = {
    userId: new Id(),
    expireIn: new Date(2099, 11, 31)
  }
  const invalidData = {
    userId: new Id(),
    expireIn: new Date(2022, 0, 1)
  }
  const createdAt = new Date()
  const updatedAt = new Date()

  describe('constructor', () => {
    it('espera criar uma instância de session', () => {
      const output = new Session(data, id, createdAt, updatedAt)

      expect(output).toMatchObject({
        userId: data.userId,
        expireIn: data.expireIn,
        createdAt,
        updatedAt
      })
    })

    it('espera lançar um erro de validação', () => {
      const badFn = (): Session =>
        new Session(invalidData, id, createdAt, updatedAt)

      expect(badFn).toThrowError('Validation error')
    })
  })

  describe('isExpired', () => {
    it('espera retornar false', () => {
      const session = new Session(data, id, createdAt, updatedAt)

      const output = session.isExpired()

      expect(output).toBe(false)
    })

    it('espera retornar true', () => {
      const session = new Session(data, id, createdAt, updatedAt)
      Object.assign(session, { _expireIn: new Date(2022, 0, 1) })

      const output = session.isExpired()

      expect(output).toBe(true)
    })
  })
})
