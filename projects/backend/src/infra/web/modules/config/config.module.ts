import { ConfigModule as NestConfigModule } from '@nestjs/config'
import type { DynamicModule } from '@nestjs/common'

export class ConfigModule extends NestConfigModule {
  static forRoot(): DynamicModule {
    return super.forRoot({
      isGlobal: true,
      load: [
        () => ({
          server: {
            port: Number(process.env.BACKEND_PORT ?? 5000)
          },
          log: {
            enabled: true,
            level: 'trace'
          },
          session: {
            privateKey: process.env.SESSION_PRIVATE_KEY,
            publicKey: process.env.SESSION_PUBLIC_KEY,
            cookie: {
              accessToken: { name: '@finper/access-token' },
              refreshToken: { name: '@finper/refresh-token' }
            }
          }
        })
      ]
    })
  }
}
