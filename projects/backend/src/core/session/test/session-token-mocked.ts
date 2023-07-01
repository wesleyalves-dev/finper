import type {
  SessionToken,
  SignOutput,
  VerifyOutput
} from '../@shared/session-token'

interface CreateSessionTokenMocked {
  signOutput: SignOutput
  verifyOutput: VerifyOutput<any>
}

export function createSessionTokenMocked(
  options: CreateSessionTokenMocked
): SessionToken {
  return {
    sign: jest.fn(() => options.signOutput),
    verify: jest.fn(() => options.verifyOutput)
  }
}
