import { Controller, Post, Req, Res } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { Request, Response } from 'express'

import {
  RefreshSessionUseCase,
  SignInUseCase,
  SignOutUseCase
} from '@core/auth'

import type { CredentialsDto } from './credentials.dto'

@Controller('auth')
export class AuthController {
  private readonly accessTokenCookieName: string
  private readonly refreshTokenCookieName: string

  constructor(
    configService: ConfigService,
    private readonly signInUseCase: SignInUseCase,
    private readonly signOutUseCase: SignOutUseCase,
    private readonly refreshSessionUseCase: RefreshSessionUseCase
  ) {
    this.accessTokenCookieName = configService.getOrThrow<string>(
      'session.cookie.accessToken.name'
    )
    this.refreshTokenCookieName = configService.getOrThrow<string>(
      'session.cookie.refreshToken.name'
    )
  }

  @Post('sign-in')
  async signIn(
    @Req() request: Request<any, CredentialsDto>,
    @Res() response: Response
  ): Promise<any> {
    const { accessTokenCookieName, refreshTokenCookieName } = this
    const { username, password } = request.body
    const { accessToken, refreshToken } = await this.signInUseCase.execute({
      credentials: { username, password }
    })
    const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30
    const THIRTY_MINUTES = 1000 * 60 * 30
    response.cookie(accessTokenCookieName, accessToken, {
      httpOnly: true,
      maxAge: THIRTY_DAYS
    })
    response.cookie(refreshTokenCookieName, refreshToken, {
      httpOnly: true,
      maxAge: THIRTY_MINUTES
    })

    return {}
  }

  @Post('sign-out')
  async signOut(
    @Req() request: Request,
    @Res() response: Response
  ): Promise<any> {
    const { accessTokenCookieName, refreshTokenCookieName } = this
    const { context } = request
    await this.signOutUseCase.execute({}, context)
    response.clearCookie(accessTokenCookieName)
    response.clearCookie(refreshTokenCookieName)

    return {}
  }

  @Post('refresh-session')
  async refreshSession(
    @Req() request: Request,
    @Res() response: Response
  ): Promise<any> {
    const { accessTokenCookieName } = this
    const { context } = request
    const { accessToken } = await this.refreshSessionUseCase.execute(
      {},
      context
    )
    response.cookie(accessTokenCookieName, accessToken)

    return {}
  }
}
