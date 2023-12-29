import type { Provider } from '@nestjs/common'

import { JwtAccessTokenService } from '../services/jwt.access-token.service'

export const AccessTokenProvider: Provider = {
  provide: 'AccessTokenService',
  useClass: JwtAccessTokenService
}
