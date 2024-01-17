import { Controller, Post, Req, Res } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { Request, Response, CookieOptions } from 'express'

import {
  RefreshSessionUseCase,
  SignInUseCase,
  SignOutUseCase
} from '@core/auth'

import type { CredentialsDto } from './credentials.dto'

interface CookiesConfig {
  accessToken: {
    name: string
    config: CookieOptions
  }
  refreshToken: {
    name: string
    config: CookieOptions
  }
}

@Controller('auth')
export class AuthController {
  private readonly cookies: CookiesConfig

  constructor(
    configService: ConfigService,
    private readonly signInUseCase: SignInUseCase,
    private readonly signOutUseCase: SignOutUseCase,
    private readonly refreshSessionUseCase: RefreshSessionUseCase
  ) {
    const accessTokenCookieName = configService.getOrThrow<string>(
      'session.cookie.accessToken.name'
    )
    const refreshTokenCookieName = configService.getOrThrow<string>(
      'session.cookie.refreshToken.name'
    )
    const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30
    const THIRTY_MINUTES = 1000 * 60 * 30

    this.cookies = {
      accessToken: {
        name: accessTokenCookieName,
        config: {
          httpOnly: true,
          maxAge: THIRTY_MINUTES
        }
      },
      refreshToken: {
        name: refreshTokenCookieName,
        config: {
          httpOnly: true,
          maxAge: THIRTY_DAYS
        }
      }
    }
  }

  @Post('sign-in')
  async signIn(
    @Req() request: Request<any, CredentialsDto>,
    @Res() response: Response
  ): Promise<void> {
    const { username, password } = request.body
    const { accessToken, refreshToken } = await this.signInUseCase.execute({
      credentials: { username, password }
    })
    response.cookie(
      this.cookies.accessToken.name,
      accessToken,
      this.cookies.accessToken.config
    )
    response.cookie(
      this.cookies.refreshToken.name,
      refreshToken,
      this.cookies.refreshToken.config
    )
    response.status(200).end()
  }

  @Post('sign-out')
  async signOut(
    @Req() request: Request,
    @Res() response: Response
  ): Promise<void> {
    const { context } = request
    await this.signOutUseCase.execute({}, context)
    response.clearCookie(this.cookies.accessToken.name)
    response.clearCookie(this.cookies.refreshToken.name)
    response.status(200).end()
  }

  @Post('refresh-session')
  async refreshSession(
    @Req() request: Request,
    @Res() response: Response
  ): Promise<void> {
    const { context } = request
    const { accessToken } = await this.refreshSessionUseCase.execute(
      {},
      context
    )
    response.cookie(
      this.cookies.accessToken.name,
      accessToken,
      this.cookies.accessToken.config
    )
    response.status(200).end()
  }
}
