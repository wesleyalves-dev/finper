import { v4 as generateUuid, validate } from 'uuid'

import { ObjectValue } from './object-value'

export class Guid extends ObjectValue {
  private readonly _value: string

  constructor(value?: string) {
    super()
    const uuid = value ?? generateUuid()
    this.validate(uuid)
    this._value = uuid
  }

  private validate(value: string): void {
    const valid = validate(value)

    if (!valid) {
      throw new Error('Invalid GUID')
    }
  }

  get value(): string {
    return this._value
  }
}
