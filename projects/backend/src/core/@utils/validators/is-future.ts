import { registerDecorator, type ValidationOptions } from 'class-validator'

export function IsFuture(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isFuture',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: Date) {
          return value > new Date()
        },
        defaultMessage() {
          return '$property must be in the future'
        }
      }
    })
  }
}
