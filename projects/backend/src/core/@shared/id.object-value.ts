import { v4 as generateUuidV4, validate, version } from 'uuid'

import { ObjectValue } from './object-value'

export class Id extends ObjectValue {
  private readonly _value: string

  constructor(value?: string) {
    super()
    const uuid = value ?? generateUuidV4()
    this.validate(uuid)
    this._value = uuid
  }

  private validate(value: string): void {
    const valid = validate(value) && version(value) === 4

    if (!valid) {
      throw new Error('Invalid UUID')
    }
  }

  get value(): string {
    return this._value
  }
}
