export interface SignOptions {
  userId: string
  expireIn?: `${number}d` | `${number}h` | `${number}m` | number
}

export interface SignOutput {
  accessToken: string
}

export interface VerifyOptions {
  accessToken: string
}

export interface VerifyOutput<Payload> {
  payload?: Payload
}

export interface SessionToken {
  sign(options: SignOptions): SignOutput
  verify<Payload>(options: VerifyOptions): VerifyOutput<Payload>
}
