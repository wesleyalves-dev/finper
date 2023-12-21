import bcrypt from 'bcryptjs'

import { ObjectValue } from '@core/@shared/object-value'
import { passwordUtil } from '@core/@utils/password-util'

import {
  PasswordValidation,
  PasswordHashValidation
} from './password.validation'

export interface PasswordProps {
  password?: string
  hash?: string
}

export class Password extends ObjectValue {
  private _hash: string

  private constructor(props: { hash: string }) {
    super()
    this._hash = props.hash
  }

  static async create(props: PasswordProps): Promise<Password> {
    const values = await new PasswordValidation().validate(props)
    const { hash: passwordHash, password } = values
    const { hash } = await new PasswordHashValidation().validate({
      hash: password ? await passwordUtil.hash(password) : passwordHash
    })

    return new Password({ hash })
  }

  get hash(): string {
    return this._hash
  }

  async verify(value: string): Promise<boolean> {
    return await bcrypt.compare(value, this._hash)
  }
}
