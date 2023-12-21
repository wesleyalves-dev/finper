import { Builder } from '@core/@test/builder'

import { Session } from '../../entity/session.object-value'

export class SessionBuilder extends Builder<Session> {
  private _token: string

  private _expiresAt: Date

  withToken(value: string): this {
    this._token = value
    return this
  }

  withExpiresAt(value: Date): this {
    this._expiresAt = value
    return this
  }

  async build(): Promise<Session> {
    return await Session.create({
      token: this._token,
      expiresAt: this._expiresAt
    })
  }
}
