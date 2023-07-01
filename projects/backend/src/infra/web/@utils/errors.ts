import { HttpStatus } from '@nestjs/common'

export function errorCodeToStatusCode(errorCode: string): number {
  const errors: Record<string, number> = {
    INTERNAL_SERVER_ERROR: HttpStatus.INTERNAL_SERVER_ERROR,
    VALIDATION: HttpStatus.BAD_REQUEST,
    AUTHENTICATION: HttpStatus.UNAUTHORIZED,
    AUTHORIZATION: HttpStatus.FORBIDDEN
  }

  return errors[errorCode] ?? HttpStatus.INTERNAL_SERVER_ERROR
}
