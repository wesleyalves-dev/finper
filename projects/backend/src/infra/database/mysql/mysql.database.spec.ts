import { MysqlDatabase } from './mysql.database'

describe('MysqlDatabase', () => {
  const dataSourceMocked = {
    initialize: jest.fn(async () => {}),
    destroy: jest.fn(async () => {})
  }
  const database = new MysqlDatabase(dataSourceMocked as any)

  describe('connect', () => {
    it('espera conectar no banco de dados', async () => {
      await database.connect()

      expect(dataSourceMocked.initialize).toBeCalledTimes(1)
    })
  })

  describe('disconnect', () => {
    it('espera desconectar do banco de dados', async () => {
      await database.disconnect()

      expect(dataSourceMocked.destroy).toBeCalledTimes(1)
    })
  })
})
