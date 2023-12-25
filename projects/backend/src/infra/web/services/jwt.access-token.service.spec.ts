import { createJwtMocked } from '@infra/web/test/mocks/jwt.mock'
import { createConfigServiceMocked } from '@infra/web/test/mocks/config-service.mock'

import { JwtAccessTokenService } from './jwt.access-token.service'

describe('JwtAccessTokenService', () => {
  const jwtMocked = createJwtMocked()
  const configServiceMocked = createConfigServiceMocked()
  const accessTokenService = new JwtAccessTokenService(
    jwtMocked as any,
    configServiceMocked as any
  )

  describe('generate', () => {
    it('espera gerar um token', () => {
      jwtMocked.sign.mockReturnValue('fake-access-token')
      const output = accessTokenService.generate({ id: { value: '1' } } as any)

      expect(output).toEqual('fake-access-token')
    })
  })

  describe('verify', () => {
    it('espera verificar um token', () => {
      jwtMocked.verify.mockReturnValueOnce({ sub: '1' })
      jwtMocked.verify.mockImplementationOnce(() => {
        throw new Error('jwt malformed')
      })

      const successOutput = accessTokenService.verify('success-access-token')
      const failureOutput = accessTokenService.verify('failure-access-token')

      expect(successOutput).toEqual({ success: true, payload: { userId: '1' } })
      expect(failureOutput).toEqual({ success: false, error: 'jwt malformed' })
    })
  })
})
