import {
  validateSync as classValidate,
  type ValidationError as ClassValidationError
} from 'class-validator'

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

export function validateEntity(object: object): ValidationError[] {
  const result = classValidate(object, {
    forbidNonWhitelisted: true,
    forbidUnknownValues: true
  })

  const errors = result.map(formatError)

  return errors
}
