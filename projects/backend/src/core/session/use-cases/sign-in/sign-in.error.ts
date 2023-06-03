import {
  ApplicationError,
  type ErrorDetails
} from '@core/@shared/application.error'

export namespace SignInError {
  export class UserOrPasswordIncorrect extends ApplicationError {
    constructor(details?: ErrorDetails) {
      super('User or password incorrect', 'AUTHENTICATION', details)
    }
  }
}
