import type { FindOneOptions, Repository } from '@core/@shared/repository'

import type { User } from '../entity/user.entity'

export interface UserRepository extends Repository<User> {
  findOne(options: FindOneOptions<User>): Promise<User>
}
