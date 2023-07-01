import { UseCase } from '@core/@shared/use-case'

import type { SessionRepository } from '../../repository/session.repository'
import type { SessionToken } from '../../@shared/session-token'
import type { RefreshInput } from './refresh.input'
import type { RefreshOutput } from './refresh.output'
import { RefreshError } from './refresh.error'

export class RefreshUseCase extends UseCase<
  RefreshInput,
  Promise<RefreshOutput>
> {
  private readonly accessTokenTime = '12h'

  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly sessionToken: SessionToken
  ) {
    super()
  }

  async execute(input: RefreshInput): Promise<RefreshOutput> {
    const { refreshToken } = input
    const session = await this.sessionRepository.get(refreshToken)
    const isExpired = session.isExpired()

    if (isExpired) {
      await this.sessionRepository.remove(refreshToken)
      throw new RefreshError.ExpiredRefreshToken()
    }

    const { accessToken } = this.sessionToken.sign({
      expireIn: this.accessTokenTime,
      userId: session.userId.value
    })

    return {
      data: {
        accessToken,
        refreshToken
      }
    }
  }
}
