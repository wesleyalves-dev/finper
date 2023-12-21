import { Validation } from '@core/@shared/validation'
import {
  IsDate,
  IsFuture,
  IsOptional,
  IsUUID,
  validateEntity
} from '@core/@utils/validators'

import { SessionProps } from './session.object-value'

export class SessionValidation extends Validation<SessionProps> {
  @IsUUID()
  @IsOptional()
  readonly token: string

  @IsFuture()
  @IsDate()
  @IsOptional()
  readonly expiresAt: Date

  async validate(value: SessionProps): Promise<SessionProps> {
    Object.assign(this, value)
    await validateEntity(this)
    return {
      token: this.token,
      expiresAt: this.expiresAt
    }
  }
}
