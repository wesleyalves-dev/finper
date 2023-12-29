import { UseCase, type Context } from '@core/@shared/use-case'
import type { UserRepository } from '@core/user/repository/user.repository'
import { Authenticate } from '@core/@shared/decorators/authenticate'

import { UserOutputMapper } from '@core/user/mapper/user-output.mapper'
import type { GetAccountInput } from './get-account.input'
import type { GetAccountOutput } from './get-account.output'

export class GetAccountUseCase extends UseCase<
  GetAccountInput,
  GetAccountOutput
> {
  private readonly userOutputMapper = new UserOutputMapper()

  constructor(private readonly userRepository: UserRepository) {
    super()
  }

  @Authenticate()
  async execute(
    _: GetAccountInput,
    context: Context
  ): Promise<GetAccountOutput> {
    const { userId } = context.session
    const user = await this.userRepository.getById(userId)
    const data = this.userOutputMapper.map(user)

    return {
      data
    }
  }
}
