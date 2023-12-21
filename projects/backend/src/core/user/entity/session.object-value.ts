import { ObjectValue } from '@core/@shared/object-value'
import { Id } from '@core/@shared/id.object-value'
import { Guid } from '@core/@shared/guid.object-value'
import { time } from '@core/@utils/time'

import { SessionValidation } from './session.validation'

export interface SessionProps {
  token?: string
  expiresAt?: Date
}

interface ConstructorProps {
  token: Guid
  expiresAt: Date
}

export class Session extends ObjectValue {
  private readonly _id: Id

  private readonly _token: Guid

  private readonly _expiresAt: Date

  private constructor(props: ConstructorProps, id: Id) {
    super()
    this._id = id
    this._token = props.token
    this._expiresAt = props.expiresAt
  }

  static async create(props: SessionProps, id?: string): Promise<Session> {
    const values = await new SessionValidation().validate(props)
    const TODAY = new Date()
    const THIRTY_DAYS = 30
    return new Session(
      {
        token: new Guid(props.token),
        expiresAt: values.expiresAt ?? time.addDays(TODAY, THIRTY_DAYS)
      },
      new Id(id)
    )
  }

  get id(): Id {
    return this._id
  }

  get token(): Guid {
    return this._token
  }

  get expiresAt(): Date {
    return this._expiresAt
  }

  get isExpired(): boolean {
    return this._expiresAt.getTime() <= Date.now()
  }
}
