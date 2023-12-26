import { createConfigServiceMocked } from '@infra/web/test/mocks/config-service.mock'
import {
  createRequestMocked,
  createResponseMocked
} from '@infra/web/test/mocks/http.mock'

import { AuthController } from './auth.controller'

describe('AuthController', () => {
  const configServiceMocked = createConfigServiceMocked()
  const useCaseMocked = { execute: jest.fn() }
  configServiceMocked.getOrThrow.mockReturnValueOnce('access-token')
  configServiceMocked.getOrThrow.mockReturnValueOnce('refresh-token')
  const controller = new AuthController(
    configServiceMocked as any,
    useCaseMocked as any,
    useCaseMocked as any,
    useCaseMocked as any
  )
  const body = {
    username: 'johndoe@example.com',
    password: '123456789'
  }
  const cookies = {
    'access-token': 'fake-access-token',
    'refresh-token': 'fake-refresh-token'
  }
  const context = {
    isAuthenticated: true
  }

  describe('signIn', () => {
    it('espera retornar um token de acesso', async () => {
      const request = createRequestMocked({ body })
      const response = createResponseMocked()
      useCaseMocked.execute.mockResolvedValueOnce({
        accessToken: 'fake-access-token',
        refreshToken: 'fake-refresh-token'
      })

      await controller.signIn(request, response)

      expect(response.cookies).toMatchObject({
        'access-token': { value: 'fake-access-token' },
        'refresh-token': { value: 'fake-refresh-token' }
      })
    })
  })

  describe('signOut', () => {
    it('espera remover os cookies', async () => {
      const request = createRequestMocked({ cookies, context })
      const response = createResponseMocked()

      await controller.signOut(request, response)

      expect(response.cookies).toMatchObject({
        'access-token': { value: '' },
        'refresh-token': { value: '' }
      })
    })
  })

  describe('refreshSession', () => {
    it('espera retornar um novo token de acesso', async () => {
      const request = createRequestMocked({ cookies, context })
      const response = createResponseMocked()
      useCaseMocked.execute.mockResolvedValueOnce({
        accessToken: 'new-fake-access-token'
      })

      await controller.refreshSession(request, response)

      expect(response.cookies).toMatchObject({
        'access-token': { value: 'new-fake-access-token' }
      })
    })
  })
})
