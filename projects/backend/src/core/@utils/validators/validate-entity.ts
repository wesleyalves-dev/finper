import {
  validateSync as classValidate,
  type ValidationError as ClassValidationError
} from 'class-validator'

import { ApplicationError } from '@core/@shared/application.error'

interface ValidationError {
  property: string
  value: any
  children?: Record<string, any>
  constraint?: Record<string, string>
}

function formatError(error: ClassValidationError): ValidationError {
  return {
    property: error.property,
    value: error.value,
    children: error.children?.map(error => formatError(error)),
    constraint: error.constraints
  }
}

export function validateEntity(object: object): void {
  const result = classValidate(object, {
    forbidNonWhitelisted: true,
    forbidUnknownValues: true
  })

  const errors = result.map(formatError)

  if (errors.length === 0) return

  throw new ApplicationError('Validation error', 'INTERNAL_SERVER_ERROR', {
    validation: errors
  })
}
