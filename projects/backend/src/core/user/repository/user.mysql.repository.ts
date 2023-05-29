import type { DataSource, Repository } from 'typeorm'

import type { FindOneOptions } from '@core/@shared/repository'
import type { Database } from '@infra/database'

import { User } from '../entity/user.entity'
import type { UserRepository } from './user.repository'
import { UserModel } from './user.mysql.model'

export class UserMysqlRepository implements UserRepository {
  private readonly repository: Repository<UserModel>

  constructor(readonly database: Database<DataSource>) {
    this.repository = database.client.getRepository(UserModel)
  }

  async findOne(options: FindOneOptions<User>): Promise<User> {
    const { where } = options
    const data = await this.repository.findOne({ where })

    if (data === null) {
      throw new Error('Object not found')
    }

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
