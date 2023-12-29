export interface Context {
  isAuthenticated: true
  session: {
    userId: string
    refreshToken: string
  }
}

export abstract class UseCase<Input, Output> {
  abstract execute(input: Input, context: Context): Promise<Output>
}
