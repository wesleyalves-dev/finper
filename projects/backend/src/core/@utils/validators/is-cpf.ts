import { registerDecorator, type ValidationOptions } from 'class-validator'
import { validateCPF } from 'validations-br'

export function IsCpf(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isCpf',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          const isValid = validateCPF(value)
          const onlyNumeric = /^\d+$/.test(value)
          return isValid && onlyNumeric
        },
        defaultMessage() {
          return '$property must be a valid CPF'
        }
      }
    })
  }
}
