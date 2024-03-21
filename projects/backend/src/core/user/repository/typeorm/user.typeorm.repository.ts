import type { DataSource, Repository as OrmRepository } from 'typeorm'

import type { Database } from '@core/@shared/database'
import type { FindOneOptions } from '@core/@shared/repository'

import { User } from '../../entity/user.entity'
import { Password } from '../../entity/password.object-value'
import { Session } from '../../entity/session.object-value'
import type { UserRepository } from '../user.repository'
import { UserTypeOrmModel } from './user.typeorm.model'
import { SessionTypeOrmNested } from './session.typeorm.nested'

export class UserTypeOrmRepository implements UserRepository {
  private readonly userRepository: OrmRepository<UserTypeOrmModel>

  constructor(database: Database<DataSource>) {
    this.userRepository = database.driver.getRepository(UserTypeOrmModel)
  }

  private async mapModelToEntity(model: UserTypeOrmModel): Promise<User> {
    return await User.create(
      {
        fullName: model.fullName,
        document: model.document,
        username: model.username,
        password: await Password.create({
          hash: model.password
        }),
        sessions: await Promise.all(
          model.sessions.map(async session => {
            return await Session.create(
              {
                token: session.token,
                issuedAt: session.issuedAt,
                expiresAt: session.expiresAt
              },
              session.id
            )
          })
        )
      },
      model.id,
      model.createdAt,
      model.updatedAt
    )
  }

  private mapEntityToModel(entity: User): UserTypeOrmModel {
    return new UserTypeOrmModel({
      id: entity.id.value,
      fullName: entity.fullName,
      document: entity.document,
      username: entity.username,
      password: entity.password.hash,
      sessions: entity.sessions.map(session => {
        return new SessionTypeOrmNested({
          id: session.id.value,
          token: session.token.value,
          issuedAt: session.issuedAt,
          expiresAt: session.expiresAt
        })
      }),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    })
  }

  async getById(id: string): Promise<User> {
    const model = await this.userRepository.findOne({ where: { id } })

    if (!model) {
      throw new Error('Object not found')
    }

    const entity = await this.mapModelToEntity(model)

    return entity
  }

  async findOne(options: FindOneOptions<User>): Promise<User | undefined> {
    const { where } = options
    const model = await this.userRepository.findOne({ where })

    if (!model) return

    const entity = await this.mapModelToEntity(model)

    return entity
  }

  async save(entity: User): Promise<void> {
    const model = this.mapEntityToModel(entity)
    await this.userRepository.save(model)
  }
}
