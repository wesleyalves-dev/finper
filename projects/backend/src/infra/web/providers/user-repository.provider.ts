import type { Provider } from '@nestjs/common'

import { UserInMemoryRepository } from '@core/user'

export const UserRepositoryProvider: Provider = {
  provide: 'UserRepository',
  useClass: UserInMemoryRepository
}
