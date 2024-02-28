import type { User } from '@core/user'

import { UserBuilder } from '../test/builders/user.builder'
import { PasswordBuilder } from '../test/builders/password.builder'
import { SessionBuilder } from '../test/builders/session.builder'
import { UserTypeOrmRepository } from './user.typeorm.repository'

describe('UserTypeOrmRepository', () => {
  const ormRepository = {
    create: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn()
  }
  const dataSource = {
    getRepository: () => ormRepository
  }
  const database = {
    driver: dataSource
  }
  const repository = new UserTypeOrmRepository(database as any)
  const repositoryProto = Object.getPrototypeOf(repository)
  Object.assign(repositoryProto, { userRepository: ormRepository })
  const userBuilder = new UserBuilder()
  const passwordBuilder = new PasswordBuilder()
  const sessionBuilder = new SessionBuilder()

  describe('mapModelToEntity', () => {
    it('espera mapear um model para entity', async () => {
      const password = await passwordBuilder.build()
      const session = await sessionBuilder.build()
      const user = await userBuilder
        .withPassword(password)
        .withSessions([session])
        .build()
      const model = {
        id: user.id.value,
        fullName: user.fullName,
        document: user.document,
        username: user.username,
        password: password.hash,
        sessions: [
          {
            id: session.id.value,
            token: session.token.value,
            issuedAt: session.issuedAt,
            expiresAt: session.expiresAt
          }
        ],
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }

      const output = await repositoryProto.mapModelToEntity(model)

      expect(output).toMatchObject(user)
    })
  })

  describe('mapEntityToModel', () => {
    it('espera mapear uma entity para model', async () => {
      const password = await passwordBuilder.build()
      const session = await sessionBuilder.build()
      const user = await userBuilder
        .withPassword(password)
        .withSessions([session])
        .build()
      const model = {
        id: user.id.value,
        fullName: user.fullName,
        document: user.document,
        username: user.username,
        password: password.hash,
        sessions: [
          {
            id: session.id.value,
            token: session.token.value,
            issuedAt: session.issuedAt,
            expiresAt: session.expiresAt
          }
        ],
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }

      const output = repositoryProto.mapEntityToModel(user)

      expect(output).toMatchObject(model)
    })
  })

  describe('getById', () => {
    let user: User

    beforeAll(async () => {
      const password = await passwordBuilder.build()
      const session = await sessionBuilder.build()
      const entity = await userBuilder
        .withPassword(password)
        .withSessions([session])
        .build()
      user = entity
      const model = {
        id: user.id.value,
        fullName: user.fullName,
        document: user.document,
        username: user.username,
        password: password.hash,
        sessions: [
          {
            id: session.id.value,
            token: session.token.value,
            issuedAt: session.issuedAt,
            expiresAt: session.expiresAt
          }
        ],
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
      ormRepository.findOne.mockResolvedValueOnce(null)
      ormRepository.findOne.mockResolvedValueOnce(model)
    })

    afterAll(() => {
      ormRepository.findOne.mockReset()
    })

    it('espera lançar um erro quando o objeto não for encontrado', async () => {
      const badFn = async (): Promise<any> =>
        await repository.getById(user.id.value)

      await expect(badFn).rejects.toThrow('Object not found')
    })

    it('espera retornar a entidade', async () => {
      const output = await repository.getById(user.id.value)

      expect(output).toMatchObject(user)
    })
  })

  describe('findOne', () => {
    let user: User

    beforeAll(async () => {
      const password = await passwordBuilder.build()
      const session = await sessionBuilder.build()
      const entity = await userBuilder
        .withPassword(password)
        .withSessions([session])
        .build()
      user = entity
      const model = {
        id: user.id.value,
        fullName: user.fullName,
        document: user.document,
        username: user.username,
        password: password.hash,
        sessions: [
          {
            id: session.id.value,
            token: session.token.value,
            issuedAt: session.issuedAt,
            expiresAt: session.expiresAt
          }
        ],
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
      ormRepository.findOne.mockResolvedValueOnce(null)
      ormRepository.findOne.mockResolvedValueOnce(model)
    })

    afterAll(() => {
      ormRepository.findOne.mockReset()
    })

    it('espera retornar undefined quando o objeto não for encontrado', async () => {
      const output = await repository.findOne({
        where: [{ id: user.id.value }]
      })

      expect(output).toBeUndefined()
    })

    it('espera retornar a entidade', async () => {
      const output = await repository.findOne({
        where: [{ id: user.id.value }]
      })

      expect(output).toMatchObject(user)
    })
  })

  describe('save', () => {
    it('espera chamar o método save', async () => {
      const password = await passwordBuilder.build()
      const session = await sessionBuilder.build()
      const user = await userBuilder
        .withPassword(password)
        .withSessions([session])
        .build()

      await repository.save(user)

      expect(ormRepository.save).toHaveBeenCalledTimes(1)
    })
  })
})
