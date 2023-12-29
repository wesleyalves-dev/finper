import { type Context, UseCase } from '@core/@shared/use-case'
import { Authenticate } from '@core/@shared/decorators/authenticate'
import type { UserRepository } from '@core/user/repository/user.repository'

import type { SignOutInput } from './sign-out.input'
import type { SignOutOutput } from './sign-out.output'

export class SignOutUseCase extends UseCase<SignOutInput, SignOutOutput> {
  constructor(private readonly userRepository: UserRepository) {
    super()
  }

  @Authenticate()
  async execute(_: SignOutInput, context: Context): Promise<SignOutOutput> {
    const { userId, refreshToken } = context.session

    const user = await this.userRepository.getById(userId)
    user.removeSessionByToken(refreshToken)
    await this.userRepository.save(user)

    return {
      success: true
    }
  }
}
