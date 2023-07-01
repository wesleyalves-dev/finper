import type { Database } from '@infra/database'

import { sessionModel } from '../test/postgres.repository'
import { session } from '../test/session'
import { SessionPostgresRepository } from './session.postgres.repository'

describe('SessionPostgresRepository', () => {
  const typeormRepository = {
    findOne: (options: any) => {
      return options.where?.id === sessionModel.id ? sessionModel : null
    },
    create: jest.fn(() => undefined),
    save: jest.fn(async () => undefined),
    delete: jest.fn(async () => undefined)
  }
  const databaseMocked: Database<any> = {
    connect: async () => {},
    disconnect: async () => {},
    client: {
      getRepository: () => typeormRepository
    }
  }
  const repository = new SessionPostgresRepository(databaseMocked)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('get', () => {
    it('espera retornar uma instância de session', async () => {
      const output = await repository.get(sessionModel.id)

      expect(output).toMatchObject({
        _id: { _value: sessionModel.id },
        _userId: { _value: sessionModel.userId },
        _expireIn: sessionModel.expireIn,
        _createdAt: sessionModel.createdAt,
        _updatedAt: sessionModel.updatedAt
      })
    })

    it('espera lançar um erro quando o objeto não for encontrado', async () => {
      const sessionModel = { id: '96216c70-ecbd-48b1-834a-5c40a06438c5' }
      const badFn = async (): Promise<any> =>
        await repository.get(sessionModel.id)

      await expect(badFn()).rejects.toThrow('Object not found')
    })
  })

  describe('save', () => {
    it('espera persistir uma session', async () => {
      await repository.save(session)

      expect(typeormRepository.create).toBeCalledTimes(1)
      expect(typeormRepository.save).toBeCalledTimes(1)
    })
  })

  describe('remove', () => {
    it('espera chamar o método delete do repository', async () => {
      await repository.remove(session.id.value)

      expect(typeormRepository.delete).toBeCalledTimes(1)
    })
  })

  describe('delete', () => {
    it('espera chamar o método delete do repository', async () => {
      await repository.delete({})

      expect(typeormRepository.delete).toBeCalledTimes(1)
    })
  })
})
