import { Global, Module } from '@nestjs/common'

import { AccessTokenProvider, UserRepositoryProvider } from '../providers'

@Global()
@Module({
  providers: [AccessTokenProvider, UserRepositoryProvider],
  exports: [AccessTokenProvider, UserRepositoryProvider]
})
export class GlobalModule {}
