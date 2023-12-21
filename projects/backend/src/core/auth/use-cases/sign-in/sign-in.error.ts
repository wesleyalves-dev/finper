import { AppError, type ErrorDetails } from '@core/@shared/app.error'

export namespace SignInError {
  export class InvalidCredentials extends AppError {
    constructor(details?: ErrorDetails) {
      super('Invalid credentials', 'AUTHENTICATION', details)
    }
  }
}
