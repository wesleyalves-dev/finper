import { Entity } from '@core/@shared/entity'
import type { Id } from '@core/@shared/id.object-value'

import { SessionValidation } from './session.validation'

export interface SessionData {
  userId: Id
  expireIn: Date
}

export class Session extends Entity {
  private readonly _userId: Id

  private readonly _expireIn: Date

  constructor(
    data: SessionData,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt)
    this.validate(data)
    this._userId = data.userId
    this._expireIn = data.expireIn
  }

  private validate(data: Partial<SessionData>): void {
    new SessionValidation(data).validate()
  }

  get userId(): Id {
    return this._userId
  }

  get expireIn(): Date {
    return this._expireIn
  }

  isExpired(): boolean {
    const now = Date.now()
    const expireIn = this._expireIn.getTime()

    return expireIn < now
  }
}
