import { Allow, IsDate, IsAfter, validateEntity } from '@core/@utils/validators'
import type { Id } from '@core/@shared/id.object-value'

import type { SessionData } from './session.entity'

export class SessionValidation {
  @Allow()
  userId: Id

  @IsAfter(() => new Date())
  @IsDate()
  expireIn: Date

  constructor(data: Partial<SessionData>) {
    Object.assign(this, data)
  }

  validate(): void {
    validateEntity(this)
  }
}
