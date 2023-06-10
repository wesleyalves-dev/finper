import { ConfigModule as NestConfigModule } from '@nestjs/config'
import type { DynamicModule } from '@nestjs/common'
import path from 'node:path'

import { getConfig } from '@config/index'

export class ConfigModule extends NestConfigModule {
  static forRoot(): DynamicModule {
    return super.forRoot({
      isGlobal: true,
      load: [getConfig],
      envFilePath: path.join(__dirname, '../../../../../.env')
    })
  }
}
