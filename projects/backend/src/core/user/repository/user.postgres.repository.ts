import type { DataSource, Repository } from 'typeorm'

import type { FindOneOptions } from '@core/@shared/repository'
import type { Database } from '@infra/database'

import { User } from '../entity/user.entity'
import type { UserRepository } from './user.repository'
import { UserModel } from './user.postgres.model'

export class UserPostgresRepository implements UserRepository {
  private readonly repository: Repository<UserModel>

  constructor(readonly database: Database<DataSource>) {
    this.repository = database.client.getRepository(UserModel)
  }

  async findOne(options: FindOneOptions<User>): Promise<User | undefined> {
    const { where } = options
    const data = await this.repository.findOne({ where })

    if (data === null) return

    const user = new User(
      {
        fullName: data.fullName,
        document: data.document,
        username: data.username,
        password: data.password
      },
      data.id,
      data.createdAt,
      data.updatedAt
    )

    return user
  }
}
