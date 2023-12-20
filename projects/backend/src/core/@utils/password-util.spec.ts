import { passwordUtil } from './password-util'

describe('passwordUtil', () => {
  describe('hash', () => {
    it('espera gerar uma hash', async () => {
      const password = 'my-password'

      const output = await passwordUtil.hash(password)

      expect(typeof output).toBe('string')
      expect(output).toHaveLength(60)
    })
  })

  describe('compare', () => {
    it('espera comparar uma hash', async () => {
      const validPassword = 'my-password'
      const invalidPassword = 'invalid-password'
      const hash =
        '$2a$10$gehS.fs1CWVppEn2NUCgAurLvOqbQSX/8c9K9krn/V7OGeE0eVuNm'

      const validPasswordOutput = await passwordUtil.compare(
        validPassword,
        hash
      )
      const invalidPasswordOutput = await passwordUtil.compare(
        invalidPassword,
        hash
      )

      expect(validPasswordOutput).toBe(true)
      expect(invalidPasswordOutput).toBe(false)
    })
  })
})
