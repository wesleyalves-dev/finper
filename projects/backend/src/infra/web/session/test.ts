import { UseCase } from '@core/@shared/use-case'
import type {
  RefreshInput,
  RefreshOutput,
  SignInInput,
  SignInOutput,
  SignOutInput,
  SignOutOutput
} from '@core/session'

export function createSignInUseCaseMock(): UseCase<
  SignInInput,
  Promise<SignInOutput>
> {
  return {
    async execute() {
      return {
        data: {
          accessToken: 'fake-access-token',
          refreshToken: 'fake-refresh-token'
        }
      }
    }
  }
}

export function createSignOutUseCaseMock(): UseCase<
  SignOutInput,
  Promise<SignOutOutput>
> {
  return {
    async execute() {
      return {
        success: true
      }
    }
  }
}

export function createRefreshUseCaseMock(): UseCase<
  RefreshInput,
  Promise<RefreshOutput>
> {
  return {
    async execute() {
      return {
        data: {
          accessToken: 'fake-access-token',
          refreshToken: 'fake-refresh-token'
        }
      }
    }
  }
}
