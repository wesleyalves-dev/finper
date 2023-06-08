export type Environment = 'development' | 'production'

export interface DatabaseConfig {
  host: string
  port: number
  base: string
  user: string
  pass: string
  log?: boolean
}

export interface SessionConfig {
  algorithm: 'RS256' | 'RS512'
  privateKey: Buffer
  publicKey: Buffer
  issuer: string
}

export interface AppConfig {
  environment: Environment
  web: {
    port: number
  }
  database: DatabaseConfig
  resource: {
    session: SessionConfig
  }
}
