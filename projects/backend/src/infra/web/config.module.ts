import { ConfigModule as NestConfigModule } from '@nestjs/config'
import type { DynamicModule } from '@nestjs/common'

export class ConfigModule extends NestConfigModule {
  static forRoot(): DynamicModule {
    return super.forRoot({
      isGlobal: true,
      load: [
        () => ({
          session: {
            privateKey: '',
            publicKey: '',
            cookie: {
              accessToken: { name: '' },
              refreshToken: { name: '' }
            }
          }
        })
      ]
    })
  }
}
