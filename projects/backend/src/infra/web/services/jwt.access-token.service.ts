import type { ConfigService } from '@nestjs/config'
import type jwt from 'jsonwebtoken'

import type { AccessTokenService, VerifyOutput } from '@core/auth'
import type { User } from '@core/user'

type Jwt = typeof jwt

export class JwtAccessTokenService implements AccessTokenService {
  constructor(
    private readonly jwt: Jwt,
    private readonly configService: ConfigService
  ) {}

  generate(user: User): string {
    const privateKey = this.configService.get('session.privateKey')
    return this.jwt.sign({}, privateKey, {
      algorithm: 'RS512',
      expiresIn: '30m',
      issuer: 'finper',
      subject: user.id.value
    })
  }

  verify(accessToken: string): VerifyOutput {
    try {
      const publicKey = this.configService.get('session.publicKey')
      const payload = this.jwt.verify(accessToken, publicKey) as jwt.JwtPayload
      return { success: true, payload: { userId: String(payload.sub) } }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }
}
