import { Injectable, Inject, type NestMiddleware } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { Request, Response, NextFunction } from 'express'

import type { AccessTokenService } from '@core/auth'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly accessTokenCookieName: string
  private readonly refreshTokenCookieName: string

  constructor(
    configService: ConfigService,
    @Inject('AccessTokenService')
    private readonly accessTokenService: AccessTokenService
  ) {
    this.accessTokenCookieName = configService.getOrThrow<string>(
      'session.cookie.accessToken.name'
    )
    this.refreshTokenCookieName = configService.getOrThrow<string>(
      'session.cookie.refreshToken.name'
    )
  }

  use(request: Request, response: Response, next: NextFunction): void {
    const { accessTokenCookieName, refreshTokenCookieName } = this
    const accessToken = request.cookies[accessTokenCookieName]
    const refreshToken = request.cookies[refreshTokenCookieName]

    if (!accessToken) {
      Object.assign(request, { context: { isAuthenticated: false } })
      next()
      return
    }

    const result = this.accessTokenService.verify(accessToken)

    if (!result.success) {
      Object.assign(request, { context: { isAuthenticated: false } })
      next()
      return
    }

    request.context = {
      isAuthenticated: true,
      session: {
        userId: result.payload.userId,
        refreshToken
      }
    }

    next()
  }
}
