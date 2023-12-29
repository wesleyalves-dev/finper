import { Builder } from '@core/@test/builder'
import { faker } from '@core/@test/utils/faker'

import { User } from '../../entity/user.entity'
import { Password } from '../../entity/password.object-value'
import { type Session } from '../../entity/session.object-value'

export class UserBuilder extends Builder<User> {
  private _id?: string

  private _fullName?: string

  private _document?: string

  private _username?: string

  private _password?: Password

  private _sessions?: Session[]

  withId(value: string): this {
    this._id = value
    return this
  }

  withFullName(value: string): this {
    this._fullName = value
    return this
  }

  withDocument(value: string): this {
    this._document = value
    return this
  }

  withUsername(value: string): this {
    this._username = value
    return this
  }

  withPassword(value: Password): this {
    this._password = value
    return this
  }

  withSessions(value: Session[]): this {
    this._sessions = value
    return this
  }

  async build(): Promise<User> {
    return await User.create(
      {
        fullName: this._fullName ?? faker.person.fullName(),
        document: this._document ?? '16343485082',
        username: this._username ?? faker.internet.email(),
        password:
          this._password ??
          (await Password.create({
            password: faker.internet.password({
              length: 20,
              prefix: 'aB10@!'
            })
          })),
        sessions: this._sessions ?? []
      },
      this._id
    )
  }
}
