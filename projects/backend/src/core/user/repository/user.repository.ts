import type { FindOneOptions, Repository } from '@core/@shared/repository'

import type { User } from '../entity/user.entity'

export interface UserRepository extends Repository<User> {
  getById: (id: string) => Promise<User>
  findOne: (options: FindOneOptions<User>) => Promise<User | undefined>
  save: (entity: User) => Promise<void>
}
