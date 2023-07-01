import type { FindOneOptions } from '@core/@shared/repository'
import type { Database } from '@infra/database'

import { user } from '../test/postgres.repository'
import type { User } from '../entity/user.entity'
import { UserPostgresRepository } from './user.postgres.repository'

describe('UserPostgresRepository', () => {
  const databaseMocked: Database<any> = {
    connect: async () => {},
    disconnect: async () => {},
    client: {
      getRepository: () => {
        return {
          findOne: (options: FindOneOptions<User>) => {
            return options.where?.[0]?.username === user.username ? user : null
          }
        }
      }
    }
  }
  const repository = new UserPostgresRepository(databaseMocked)

  describe('findOne', () => {
    it('espera retornar uma instância de user', async () => {
      const output = await repository.findOne({
        where: [{ username: 'john.doe' }]
      })

      expect(output).toMatchObject({
        _id: { _value: user.id },
        _fullName: user.fullName,
        _document: user.document,
        _username: user.username,
        _password: user.password,
        _createdAt: user.createdAt,
        _updatedAt: user.updatedAt
      })
    })

    it('espera lançar um erro quando o objeto não for encontrado', async () => {
      const output = await repository.findOne({
        where: [{ username: 'jane.doe' }]
      })

      expect(output).toBeUndefined()
    })
  })
})
