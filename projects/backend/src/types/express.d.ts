interface Context {
  isAuthenticated: true
  session: {
    userId: string
    refreshToken: string
  }
}

export declare module 'express' {
  export interface Request {
    context: Context
  }
}
