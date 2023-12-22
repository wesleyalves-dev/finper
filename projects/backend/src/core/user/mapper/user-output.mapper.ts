import { Mapper } from '@core/@shared/mapper'

import type { User } from '../entity/user.entity'
import type { UserOutput } from './user.output'

export class UserOutputMapper extends Mapper<User, UserOutput> {
  map(user: User): UserOutput {
    return {
      id: user.id.value,
      fullName: user.fullName,
      document: user.document,
      username: user.username
    }
  }
}
