import { UseCase } from '@core/@shared/use-case'
import type { UserRepository } from '@core/user/repository/user.repository'
import { Session } from '@core/user/entity/session.object-value'
import { ValidateInput } from '@core/@utils/validators'

import type { AccessTokenService } from '../../services/access-token/access-token.service'
import { SignInInput } from './sign-in.input'
import type { SignInOutput } from './sign-in.output'
import { SignInError } from './sign-in.error'

export class SignInUseCase extends UseCase<SignInInput, SignInOutput> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly accessTokenService: AccessTokenService
  ) {
    super()
  }

  @ValidateInput(SignInInput)
  async execute(input: SignInInput): Promise<SignInOutput> {
    const { username, password } = input.credentials

    const user = await this.userRepository.findOne({ where: { username } })

    if (!user) {
      throw new SignInError.InvalidCredentials({})
    }

    const isPasswordValid = await user.password.verify(password)

    if (!isPasswordValid) {
      throw new SignInError.InvalidCredentials({})
    }

    const session = await Session.create({})
    user.addSession(session)
    await this.userRepository.save(user)

    return {
      accessToken: this.accessTokenService.generate(user),
      refreshToken: session.token.value
    }
  }
}
