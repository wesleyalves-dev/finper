import { type Context, UseCase } from '@core/@shared/use-case'
import { Authenticate } from '@core/@shared/decorators/authenticate'
import type { UserRepository } from '@core/user/repository/user.repository'

import type { AccessTokenService } from '../../services/access-token.service'
import type { RefreshSessionInput } from './refresh-session.input'
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

  @Authenticate()
  async execute(
    _: RefreshSessionInput,
    context: Context
  ): Promise<RefreshSessionOutput> {
    const { userId, refreshToken } = context.session

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
