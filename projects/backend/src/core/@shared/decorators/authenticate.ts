import { AppError, type ErrorDetails } from '@core/@shared/app.error'

export class AuthenticateError extends AppError {
  constructor(details?: ErrorDetails) {
    super('Unauthenticated', 'UNAUTHORIZED', details)
  }
}

export function Authenticate() {
  return function (_: object, __: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = function (...args: any[]) {
      const context = args[1] || {}
      const { isAuthenticated } = context

      if (!isAuthenticated) {
        throw new AuthenticateError()
      }

      return originalMethod.apply(this, args)
    }

    return descriptor
  }
}
