import { Logger } from '@nestjs/common'
import type { ConfigService } from '@nestjs/config'
import pino, { type Logger as PinoLogger } from 'pino'

export class LoggerService extends Logger {
  private readonly pino: PinoLogger

  constructor(configService: ConfigService) {
    super()
    const environment = configService.get<string>('environment')
    const enabled = configService.get<boolean>('log.enabled')
    const level = configService.get<string>('log.level')
    this.pino = pino({
      enabled,
      level,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: environment === 'development'
        }
      }
    })
  }

  log(message: any, ...optionalParams: any[]): void {
    this.pino.info(message, ...optionalParams)
  }

  error(message: any, ...optionalParams: any[]): void {
    this.pino.error(message, ...optionalParams)
  }

  warn(message: any, ...optionalParams: any[]): void {
    this.pino.warn(message, ...optionalParams)
  }

  debug(message: any, ...optionalParams: any[]): void {
    this.pino.debug(message, ...optionalParams)
  }
}
