import type { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import jwt from 'jsonwebtoken'

import { JwtAccessTokenService } from '../services/jwt.access-token.service'

export const AccessTokenProvider: Provider = {
  provide: 'AccessTokenService',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return new JwtAccessTokenService(jwt, configService)
  }
}
