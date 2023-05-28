import {
  IsString,
  IsNumberString,
  Length,
  Matches,
  validateEntity
} from '@core/@utils/validators'
import { PASSWORD_REGEX } from '@core/@utils/regex'
import { ApplicationError } from '@core/@shared/application.error'

import type { UserData } from './user.entity'

export class UserValidation {
  @Length(5, 50)
  @IsString()
  fullName: string

  @Length(11, 11)
  @IsNumberString()
  @IsString()
  document: string

  @Length(5, 20)
  @IsString()
  username: string

  @Matches(PASSWORD_REGEX)
  @IsString()
  password: string

  constructor(data: Partial<UserData>) {
    Object.assign(this, data)
  }

  validate(): void {
    const errors = validateEntity(this)

    if (errors.length === 0) return

    throw new ApplicationError('Validation error', 'INTERNAL_SERVER_ERROR', {
      validation: errors
    })
  }
}
