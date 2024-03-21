export interface Config {
  server: {
    port: number
  }
  log: {
    enabled: boolean
    level: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal'
  }
  session: {
    privateKey: string
    publicKey: string
    cookie: {
      accessToken: {
        name: string
      }
      refreshToken: {
        name: string
      }
    }
  }
  database: {
    host: string
    port: number
    base: string
    user: string
    pass: string
  }
}
