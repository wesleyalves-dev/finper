import { pass } from './pass'

const compareCases: Array<[string, string, boolean]> = [
  [
    'password1',
    '$2a$10$S38KURkbQxKd2btUAWTvUehFsyTn85Twf98Yr11DyXUTN.XjHgSBi',
    true
  ],
  [
    'test1',
    '$2a$10$EIwmYmUPgVsRtZ26BuYDMetAmRhpva3mheZodiygZJsex0EFSZnku',
    true
  ],
  [
    'password1',
    '$2a$10$anSdv9mSp4nTWH/vomXPz.RPMgblBNUwvEmGGjfjQ2oBhubJQVmS6',
    false
  ],
  [
    'test1',
    '$2a$10$FhFNoWHKJplEn7ID129AueHGcD5chIwa5DWIwQtC0Ear/m8hH4IX6',
    false
  ]
]

describe('pass', () => {
  describe('hash', () => {
    it('espera retornar um hash em formato string', async () => {
      const text = 'test'

      const output = await pass.hash(text)

      expect(typeof output).toBe('string')
    })
  })

  describe('compare', () => {
    test.each(compareCases)(
      'espera verificar %p',
      async (text, hash, expected) => {
        const output = await pass.compare(text, hash)

        expect(output).toBe(expected)
      }
    )
  })
})
