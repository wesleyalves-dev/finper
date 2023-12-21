import { UseCase } from '@core/@shared/use-case'
import type { UserRepository } from '@core/user/repository/user.repository'
import { ValidateInput } from '@core/@utils/validators'

import type { AccessTokenService } from '../../services/access-token/access-token.service'
import { RefreshSessionInput } from './refresh-session.input'
import type { RefreshSessionOutput } from './refresh-session.output'
import { RefreshSessionError } from './refresh-session.error'

export class RefreshSessionUseCase extends UseCase<
  RefreshSessionInput,
  RefreshSessionOutput
> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly accessTokenService: AccessTokenService
  ) {
    super()
  }

  @ValidateInput(RefreshSessionInput)
  async execute(input: RefreshSessionInput): Promise<RefreshSessionOutput> {
    const { userId, refreshToken } = input

    const user = await this.userRepository.getById(userId)
    const session = user.getSessionByToken(refreshToken)

    if (!session) {
      throw new RefreshSessionError.InvalidSession()
    }

    if (session.isExpired) {
      throw new RefreshSessionError.SessionExpired()
    }

    return {
      accessToken: this.accessTokenService.generate(user)
    }
  }
}
