import {
  IsString,
  IsNumberString,
  Length,
  Matches,
  validateEntity
} from '@core/@utils/validators'
import { PASSWORD_REGEX } from '@core/@utils/regex'

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
    validateEntity(this)
  }
}
