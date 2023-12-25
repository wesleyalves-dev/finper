import type { AccessTokenService } from '@core/auth'

export function createAccessTokenServiceMocked(): Record<
  keyof AccessTokenService,
  jest.Mock
> {
  return {
    generate: jest.fn(),
    verify: jest.fn()
  }
}
