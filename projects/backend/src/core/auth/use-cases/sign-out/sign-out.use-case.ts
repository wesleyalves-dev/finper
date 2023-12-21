import { UseCase } from '@core/@shared/use-case'
import type { UserRepository } from '@core/user/repository/user.repository'
import { ValidateInput } from '@core/@utils/validators'

import { SignOutInput } from './sign-out.input'
import type { SignOutOutput } from './sign-out.output'

export class SignOutUseCase extends UseCase<SignOutInput, SignOutOutput> {
  constructor(private readonly userRepository: UserRepository) {
    super()
  }

  @ValidateInput(SignOutInput)
  async execute(input: SignOutInput): Promise<SignOutOutput> {
    const { userId, refreshToken } = input

    const user = await this.userRepository.getById(userId)
    user.removeSessionByToken(refreshToken)
    await this.userRepository.save(user)

    return {
      success: true
    }
  }
}
