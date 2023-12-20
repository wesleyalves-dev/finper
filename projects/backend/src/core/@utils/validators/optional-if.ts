import { registerDecorator, ValidationOptions } from 'class-validator'

export function OptionalIf(
  anotherProperty: string,
  validationOptions?: ValidationOptions
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'optionalIf',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, args: any) {
          const anotherPropertyValue = args?.object?.[anotherProperty]

          if (anotherPropertyValue) return true

          return !!value
        },
        defaultMessage() {
          return `$property is required if ${anotherProperty} is not provided`
        }
      }
    })
  }
}
