import type { User } from '@core/user/entity/user.entity'

export interface VerifySuccessOutput {
  success: true
  payload: { userId: string }
}

export interface VerifyFailureOutput {
  success: false
  error: string
}

export type VerifyOutput = VerifySuccessOutput | VerifyFailureOutput

export interface AccessTokenService {
  generate: (user: User) => string
  verify: (token: string) => VerifyOutput
}
