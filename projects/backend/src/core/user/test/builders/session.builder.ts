import { Builder } from '@core/@test/builder'

import { Session } from '../../entity/session.object-value'

export class SessionBuilder extends Builder<Session> {
  private _issuedAt: Date

  private _token: string

  private _expiresAt: Date

  withIssuedAt(value: Date): this {
    this._issuedAt = value
    return this
  }

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
      issuedAt: this._issuedAt,
      token: this._token,
      expiresAt: this._expiresAt
    })
  }
}
