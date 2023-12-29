import { AppError } from '@core/@shared/app.error'

import { validate } from './'

export class ValidateInputError extends AppError {
  constructor(validation: any) {
    super('Input validation failed', 'VALIDATION', { validation })
  }
}

export function ValidateInput<Input extends object>(
  Constructor: new (input: any) => Input
) {
  return function (_: object, __: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = async function (...args: any[]) {
      const input = args[0]

      const inputInstance = new Constructor(input)

      const errors = await validate(inputInstance, {
        forbidNonWhitelisted: true,
        forbidUnknownValues: true
      })

      if (errors.length === 0) return originalMethod.apply(this, args)

      throw new ValidateInputError(errors)
    }

    return descriptor
  }
}
