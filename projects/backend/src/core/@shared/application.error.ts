export type ErrorCode =
  | 'INTERNAL_SERVER_ERROR'
  | 'VALIDATION'
  | 'AUTHENTICATION'

export type ErrorDetails = Record<string, any>

export class ApplicationError extends Error {
  readonly code: ErrorCode

  readonly details?: ErrorDetails

  constructor(
    message: string,
    code: ErrorCode = 'INTERNAL_SERVER_ERROR',
    details?: ErrorDetails
  ) {
    super(message)
    this.code = code
    this.details = details
  }
}
