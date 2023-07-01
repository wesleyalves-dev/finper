import { registerDecorator, type ValidationOptions } from 'class-validator'

export function isAfter(compare: () => Date, value: any): boolean {
  if (!(value instanceof Date)) return false

  const date = compare()

  return value.getTime() > date.getTime()
}

export function IsAfter(
  compare: () => Date,
  validationOptions?: ValidationOptions
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isAfter',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: (value: any) => isAfter(compare, value)
      }
    })
  }
}
