export type ErrorCode = 'INTERNAL' | 'VALIDATION' | 'AUTHENTICATION'

export interface ErrorDetails {
  description?: string
  reason?: string
  validation?: any
  [key: string]: any
}

export class AppError extends Error {
  constructor(
    readonly message: string,
    readonly code: ErrorCode = 'INTERNAL',
    readonly details?: ErrorDetails
  ) {
    super(message)
  }
}
