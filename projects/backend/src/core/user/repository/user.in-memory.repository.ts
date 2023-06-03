import type { FindOneOptions } from '@core/@shared/repository'
import type { User } from '../entity/user.entity'
import type { UserRepository } from './user.repository'

export class UserInMemoryRepository implements UserRepository {
  private readonly users: User[] = []

  async findOne(options: FindOneOptions<User>): Promise<User | undefined> {
    const { username } = options.where ?? {}

    return this.users.find(user => user.username === username)
  }

  async save(data: User): Promise<void> {
    this.users.push(data)
  }
}
