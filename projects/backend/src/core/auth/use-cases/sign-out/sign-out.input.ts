import { IsNotEmpty, IsString, IsUUID } from '@core/@utils/validators'

export class SignOutInput {
  @IsUUID('4')
  @IsNotEmpty()
  @IsString()
  userId: string

  @IsUUID()
  @IsNotEmpty()
  @IsString()
  refreshToken: string

  constructor(values: SignOutInput) {
    this.userId = values?.userId
    this.refreshToken = values?.refreshToken
  }
}
