import { UseCase } from '@core/@shared/use-case'

import type { SessionRepository } from '../../repository'
import type { SignOutInput } from './sign-out.input'
import type { SignOutOutput } from './sign-out.output'

export class SignOutUseCase extends UseCase<
  SignOutInput,
  Promise<SignOutOutput>
> {
  constructor(private readonly sessionRepository: SessionRepository) {
    super()
  }

  async execute(input: SignOutInput): Promise<SignOutOutput> {
    const { refreshToken: id } = input
    await this.sessionRepository.get(id)
    await this.sessionRepository.remove(id)

    return {
      success: true
    }
  }
}
