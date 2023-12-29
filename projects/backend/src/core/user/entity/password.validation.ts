import { Validation } from '@core/@shared/validation'
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  validateEntity
} from '@core/@utils/validators'

import { type PasswordProps } from './password.object-value'

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_@$!%*?&-])[A-Za-z\d_@$!%*?&-]{8,50}$/

export class PasswordValidation extends Validation<PasswordProps> {
  @Length(60, 60)
  @IsString()
  @IsOptional()
  readonly hash: string

  @Matches(PASSWORD_REGEX)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly password: string

  async validate(value: PasswordProps): Promise<Required<PasswordProps>> {
    Object.assign(this, value)
    await validateEntity(this)
    return {
      password: this.password,
      hash: this.hash
    }
  }
}

export class PasswordHashValidation extends Validation<{ hash: string }> {
  @Length(60, 60)
  @IsString()
  readonly hash: string

  async validate(value: PasswordProps): Promise<{ hash: string }> {
    Object.assign(this, value)
    await validateEntity(this)
    return {
      hash: this.hash
    }
  }
}
