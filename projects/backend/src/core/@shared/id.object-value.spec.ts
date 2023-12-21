import { Id } from './id.object-value'

describe('Id', () => {
  it('espera instanciar um id corretamente', () => {
    const validUuidV4 = 'db5d56b7-085d-4e4a-ae27-e00fb0458f54'
    const invalidUuidV4 = 'invalid-id'

    const randomId = new Id()
    const specificId = new Id(validUuidV4)
    const badId = (): Id => new Id(invalidUuidV4)

    expect(typeof randomId.value).toEqual('string')
    expect(specificId.value).toEqual(validUuidV4)
    expect(badId).toThrow('Invalid UUID')
  })
})
