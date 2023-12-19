import { Guid } from './guid.object-value'

describe('Guid', () => {
  const guidRegex = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i

  it('espera gerar um guid', () => {
    const validGuid = '91583148-eefb-52b2-b331-1bda2514c50f'
    const invalidGuid = 'invalid-guid'

    const randomGuid = new Guid()
    const specificGuid = new Guid(validGuid)
    const badGuid = () => new Guid(invalidGuid)

    expect(randomGuid.value).toMatch(guidRegex)
    expect(specificGuid.value).toMatch(guidRegex)
    expect(badGuid).toThrow('Invalid GUID')
  })
})
