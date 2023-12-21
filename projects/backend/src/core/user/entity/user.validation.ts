import { Validation } from '@core/@shared/validation'
import {
  IsCpf,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  validateEntity
} from '@core/@utils/validators'

import { UserProps } from './user.entity'

export class UserValidation extends Validation<UserProps> {
  @MaxLength(256)
  @IsNotEmpty()
  @IsString()
  readonly fullName: string

  @IsCpf()
  @IsString()
  readonly document: string

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  readonly username: string

  readonly password: UserProps['password']

  readonly sessions: UserProps['sessions']

  async validate(value: Partial<UserProps>): Promise<UserProps> {
    Object.assign(this, value)
    await validateEntity(this)
    return {
      fullName: this.fullName,
      document: this.document,
      username: this.username,
      password: this.password,
      sessions: this.sessions
    }
  }
}
