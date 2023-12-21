import type {
  AccessTokenService,
  VerifyOutput
} from '../services/access-token/access-token.service'

interface CreateAccessTokenServiceMockedOptions {
  output?: {
    generate: string
    verify: VerifyOutput
  }
}

export function createAccessTokenServiceMocked(
  options?: CreateAccessTokenServiceMockedOptions
): AccessTokenService {
  const {
    generate = 'fake-access-token',
    verify = {
      success: true,
      payload: { userId: '43df15e7-63b4-4117-ab03-ae893dc53009' }
    }
  } = options?.output ?? {}

  return {
    generate: jest.fn(() => generate),
    verify: jest.fn(() => verify)
  }
}
