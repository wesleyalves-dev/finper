import type { Context } from '@core/@shared/use-case'

interface CreateContextMockedOptions {
  isAuthenticated?: boolean
  session?: {
    userId?: string
    refreshToken?: string
  }
}

export function createContextMocked(
  options?: CreateContextMockedOptions
): Context {
  const { isAuthenticated = true, session = {} } = options ?? {}
  const {
    refreshToken = 'b3dc099b-37d7-5474-bf80-51355e8b9909',
    userId = 'b04bbdd1-eb3f-424b-89a5-d125c17b299a'
  } = session

  return {
    isAuthenticated,
    session: {
      userId,
      refreshToken
    }
  } as unknown as Context
}
