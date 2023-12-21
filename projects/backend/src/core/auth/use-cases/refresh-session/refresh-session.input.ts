import { IsNotEmpty, IsString, IsUUID } from '@core/@utils/validators'

export class RefreshSessionInput {
  @IsUUID('4')
  @IsNotEmpty()
  @IsString()
  userId: string

  @IsUUID()
  @IsNotEmpty()
  @IsString()
  refreshToken: string

  constructor(values: RefreshSessionInput) {
    this.userId = values?.userId
    this.refreshToken = values?.refreshToken
  }
}
