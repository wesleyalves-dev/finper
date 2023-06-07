import { UseCase } from '@core/@shared/use-case'
import type { UserRepository } from '@core/user'
import type { SessionRepository } from '@core/session'
import { Session } from '@core/session'
import { time } from '@core/@utils/time'

import type { SessionToken } from '../../@shared/session-token'
import type { SignInInput } from './sign-in.input'
import type { SignInOutput } from './sign-in.output'
import { SignInError } from './sign-in.error'

export class SignInUseCase extends UseCase<SignInInput, Promise<SignInOutput>> {
  private readonly accessTokenTime = '12h'
  private readonly refreshTokenTime = 30

  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly sessionToken: SessionToken
  ) {
    super()
  }

  async execute(input: SignInInput): Promise<SignInOutput> {
    const { username, password } = input.credential
    const user = await this.userRepository.findOne({ where: [{ username }] })

    if (user === undefined) {
      throw new SignInError.UserOrPasswordIncorrect()
    }

    const match = await user.comparePassword(password)

    if (match === false) {
      throw new SignInError.UserOrPasswordIncorrect()
    }

    const session = new Session({
      userId: user.id,
      expireIn: time.addDays(new Date(), this.refreshTokenTime)
    })
    await this.sessionRepository.save(session)
    const { accessToken } = this.sessionToken.sign({
      expireIn: this.accessTokenTime,
      userId: user.id.value
    })
    const { value: refreshToken } = session.id

    return {
      data: {
        accessToken,
        refreshToken
      }
    }
  }
}
