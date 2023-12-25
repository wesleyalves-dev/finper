import { createConfigServiceMocked } from '../test/mocks/config-service.mock'
import { createAccessTokenServiceMocked } from '../test/mocks/access-token-service.mock'
import {
  createRequestMocked,
  createResponseMocked
} from '../test/mocks/http.mock'

import { AuthMiddleware } from './auth.middleware'

describe('AuthMiddleware', () => {
  const configServiceMocked = createConfigServiceMocked()
  const accessTokenServiceMocked = createAccessTokenServiceMocked()
  configServiceMocked.getOrThrow.mockReturnValueOnce('fake-access-token-cookie')
  configServiceMocked.getOrThrow.mockReturnValueOnce(
    'fake-refresh-token-cookie'
  )
  const middleware = new AuthMiddleware(
    configServiceMocked as any,
    accessTokenServiceMocked
  )
  const requestOptions = {
    cookies: {
      'fake-access-token-cookie': 'fake-access-token',
      'fake-refresh-token-cookie': 'fake-refresh-token'
    }
  }

  describe('use', () => {
    it('espera definir isAuthenticated false quando o token de acesso não for enviado', () => {
      const request = createRequestMocked()
      const response = createResponseMocked()
      const next = (): void => {}

      middleware.use(request, response, next)

      expect(request.context).toEqual({
        isAuthenticated: false
      })
    })

    it('espera definir isAuthenticated false quando o token de acesso for inválido', () => {
      const request = createRequestMocked(requestOptions)
      const response = createResponseMocked()
      const next = (): void => {}
      accessTokenServiceMocked.verify.mockReturnValue({ success: false })

      middleware.use(request, response, next)

      expect(request.context).toEqual({
        isAuthenticated: false
      })
    })

    it('espera definir isAuthenticated true quando o token de acesso for válido', () => {
      const request = createRequestMocked(requestOptions)
      const response = createResponseMocked()
      const next = (): void => {}
      accessTokenServiceMocked.verify.mockReturnValue({
        success: true,
        payload: { userId: 'eb9b9c59-996e-4044-af5f-1178a8c5875b' }
      })

      middleware.use(request, response, next)

      expect(request.context).toEqual({
        isAuthenticated: true,
        session: {
          userId: 'eb9b9c59-996e-4044-af5f-1178a8c5875b',
          refreshToken: 'fake-refresh-token'
        }
      })
    })
  })
})
