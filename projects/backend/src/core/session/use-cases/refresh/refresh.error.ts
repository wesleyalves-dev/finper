import {
  ApplicationError,
  type ErrorDetails
} from '@core/@shared/application.error'

export namespace RefreshError {
  export class ExpiredRefreshToken extends ApplicationError {
    constructor(details?: ErrorDetails) {
      super('Session is expired', 'AUTHENTICATION', details)
    }
  }
}
