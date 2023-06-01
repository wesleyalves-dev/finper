import jwt from 'jsonwebtoken'

import type {
  SessionToken,
  SignOptions,
  SignOutput,
  VerifyOptions,
  VerifyOutput
} from './session-token'

export interface JwtSessionTokenConfig {
  algorithm: jwt.Algorithm
  privateKey: string
  publicKey: string
  issuer?: string
}

export class JwtSessionToken implements SessionToken {
  private readonly jwt = jwt

  constructor(private readonly config: JwtSessionTokenConfig) {}

  sign(options: SignOptions): SignOutput {
    const { algorithm, privateKey, issuer } = this.config
    const { userId, expireIn: expiresIn = undefined } = options

    const accessToken = this.jwt.sign({ userId }, privateKey, {
      subject: userId,
      algorithm,
      expiresIn,
      issuer
    })

    return {
      accessToken
    }
  }

  verify<Payload>(options: VerifyOptions): VerifyOutput<Payload> {
    try {
      const { publicKey } = this.config
      const { accessToken } = options

      const payload = this.jwt.verify(accessToken, publicKey) as Payload

      return {
        payload
      }
    } catch (err) {
      return {}
    }
  }
}
