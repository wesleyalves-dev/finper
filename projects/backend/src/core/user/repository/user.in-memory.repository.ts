import type { FindOneOptions } from '@core/@shared/repository'

import type { User } from '../entity/user.entity'
import type { UserRepository } from './user.repository'

export class UserInMemoryRepository implements UserRepository {
  private users: User[] = []

  async getById(id: string): Promise<User> {
    const user = this.users.find(user => user.id.value === id)

    if (user === undefined) {
      throw new Error('Object not found')
    }

    return user
  }

  async findOne(options: FindOneOptions<User>): Promise<User | undefined> {
    return this.users.find(user => {
      return (
        user.id.value === options.where?.id?.value ||
        user.username === options.where?.username
      )
    })
  }

  async save(entity: User): Promise<void> {
    this.users = this.users.map(user => {
      return user.id.value === entity.id.value ? entity : user
    })
  }
}
