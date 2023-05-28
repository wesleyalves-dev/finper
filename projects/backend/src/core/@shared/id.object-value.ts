import {
  v4 as generateUuid,
  validate as validateUuid,
  version as checkUuidVersion
} from 'uuid'

import { ObjectValue } from './object-value'

export class Id extends ObjectValue {
  private readonly _value: string

  constructor(input?: string) {
    super()
    const value = input ?? generateUuid()
    this.validate(value)
    this._value = value.toLowerCase()
  }

  private validate(value: string): void {
    const isValid = validateUuid(value) && checkUuidVersion(value) === 4

    if (isValid) return

    throw new Error(`"${value}" is not a valid uuid v4`)
  }

  get value(): string {
    return this._value
  }
}
