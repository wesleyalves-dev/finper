import { Controller, Post, Put, Req, Res, Body } from '@nestjs/common'
import type { Request, Response } from 'express'

import { SignInUseCase, SignOutUseCase, RefreshUseCase } from '@core/session'

import type { CredentialsDto } from './credentials.dto'
import type { SessionOutput, Success } from './session.output'

@Controller('session')
export class SessionController {
  readonly cookieName = '@finper/token'

  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly signOutUseCase: SignOutUseCase,
    private readonly refreshUseCase: RefreshUseCase
  ) {}

  @Post('sign-in')
  async signIn(
    @Body() credentials: CredentialsDto,
    @Res() response: Response
  ): Promise<Response<SessionOutput>> {
    const input = { credentials }
    const output = await this.signInUseCase.execute(input)
    const { accessToken, refreshToken } = output.data
    const TWELVE_HOURS = 1000 * 60 * 60 * 12
    response.cookie(this.cookieName, refreshToken, {
      httpOnly: true,
      maxAge: TWELVE_HOURS
    })

    return response.json({ accessToken })
  }

  @Put('sign-out')
  async signOut(
    @Req() request: Request,
    @Res() response: Response
  ): Promise<Response<Success>> {
    const refreshToken = request.cookies[this.cookieName]
    const input = { refreshToken }
    const output = await this.signOutUseCase.execute(input)
    const { success } = output
    response.clearCookie(this.cookieName)

    return response.json({ success })
  }

  @Put('refresh')
  async refresh(@Req() request: Request): Promise<SessionOutput> {
    const refreshToken = request.cookies[this.cookieName]
    const input = { refreshToken }
    const output = await this.refreshUseCase.execute(input)
    const { accessToken } = output.data

    return { accessToken }
  }
}
