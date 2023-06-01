import { JwtSessionToken } from './jwt.session-token'
import { privateKeyRsa256, publicKeyRsa256, validJwt, invalidJwt } from './test'

describe('JwtSessionToken', () => {
  const sessionToken = new JwtSessionToken({
    algorithm: 'RS256',
    privateKey: privateKeyRsa256,
    publicKey: publicKeyRsa256,
    issuer: 'Test'
  })

  describe('sign', () => {
    it('espera retornar um objeto com um jwt', () => {
      const ONE_MINUTE = 1000 * 60
      const options = {
        userId: '123',
        expireIn: ONE_MINUTE
      }

      const output = sessionToken.sign(options)

      expect(output).toMatchObject({
        accessToken: expect.any(String)
      })
    })
  })

  describe('verify', () => {
    it('espera retornar um objeto com o payload quando o token for válido', () => {
      const options = {
        accessToken: validJwt
      }

      const output = sessionToken.verify(options)

      expect(output).toMatchObject({
        payload: {
          exp: 1578485495222,
          iat: 1685495222,
          iss: 'Test',
          sub: '123',
          userId: '123'
        }
      })
    })

    it('espera retornar um objeto com payload vazio quando o token for inválido', () => {
      const options = {
        accessToken: invalidJwt
      }

      const output = sessionToken.verify(options)

      expect(output.payload).toBeUndefined()
    })
  })
})
