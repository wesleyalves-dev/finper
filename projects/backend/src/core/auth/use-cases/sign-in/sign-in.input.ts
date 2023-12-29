import {
  IsEmail,
  IsNotEmpty,
  IsString,
  ValidateNested
} from '@core/@utils/validators'

export class Credentials {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  username: string

  @IsNotEmpty()
  @IsString()
  password: string

  constructor(values: Credentials) {
    Object.assign(this, values)
  }
}

export class SignInInput {
  @ValidateNested()
  credentials: Credentials

  constructor(values: SignInInput) {
    this.credentials = new Credentials(values?.credentials)
  }
}
