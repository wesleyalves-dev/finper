import { TypeOrmDatabase } from './typeorm.database'

describe('TypeOrmDatabase', () => {
  const driver = {
    isInitialized: true,
    initialize: jest.fn(),
    destroy: jest.fn()
  }
  const database = new TypeOrmDatabase(driver as any)

  describe('connected', () => {
    it('espera retornar um boolean', () => {
      expect(database.connected).toBe(true)
    })
  })

  describe('connect', () => {
    it('espera chamar o método initialize', async () => {
      await database.connect()

      expect(driver.initialize).toHaveBeenCalledTimes(1)
    })
  })

  describe('disconnect', () => {
    it('espera chamar o método destroy', async () => {
      await database.disconnect()

      expect(driver.destroy).toHaveBeenCalledTimes(1)
    })
  })
})
