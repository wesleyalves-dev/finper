import {
  registerDecorator,
  type ValidationOptions,
  matches
} from 'class-validator'

export function isBcryptHash(value: string): boolean {
  const bcryptPattern = /^\$2[ayb]\$(\d{1,2})\$[./A-Za-z0-9]{53}$/

  return bcryptPattern.test(value)
}

export function isPasswordOrHash(value: string, pattern: RegExp): boolean {
  const matchPattern = matches(value, pattern)
  const isHash = isBcryptHash(value)

  return matchPattern || isHash
}

export function IsPasswordOrHash(
  pattern: RegExp,
  validationOptions?: ValidationOptions
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isPasswordOrHash',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: (value: any) => isPasswordOrHash(value, pattern)
      }
    })
  }
}
