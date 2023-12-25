import type { AccessTokenService } from '../services/access-token.service'

export function createAccessTokenServiceMocked(): Record<
  keyof AccessTokenService,
  jest.Mock
> {
  return {
    generate: jest.fn(),
    verify: jest.fn()
  }
}
