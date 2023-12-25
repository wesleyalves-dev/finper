import type { ConfigService } from '@nestjs/config'

export function createConfigServiceMocked(): Record<
  keyof ConfigService,
  jest.Mock
> {
  return {
    get: jest.fn(),
    getOrThrow: jest.fn()
  }
}
