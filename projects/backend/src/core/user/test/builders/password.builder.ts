import { Builder } from '@core/@test/builder'
import { faker } from '@core/@test/utils/faker'

import { Password } from '../../entity/password.object-value'

export class PasswordBuilder extends Builder<Password> {
  private _hash: string

  private _password: string

  withHash(value: string): this {
    this._hash = value
    return this
  }

  withPassword(value: string): this {
    this._password = value
    return this
  }

  async build(): Promise<Password> {
    return await Password.create({
      hash: this._hash,
      password: this._hash
        ? undefined
        : this._password ??
          faker.internet.password({
            length: 20,
            prefix: 'aB10@!'
          })
    })
  }
}
