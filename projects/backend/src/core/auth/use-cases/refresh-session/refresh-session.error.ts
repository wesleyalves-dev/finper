import { AppError, type ErrorDetails } from '@core/@shared/app.error'

export namespace RefreshSessionError {
  export class InvalidSession extends AppError {
    constructor(details?: ErrorDetails) {
      super('Invalid session', 'AUTHENTICATION', details)
    }
  }

  export class SessionExpired extends AppError {
    constructor(details?: ErrorDetails) {
      super('Expired session', 'AUTHENTICATION', details)
    }
  }
}
