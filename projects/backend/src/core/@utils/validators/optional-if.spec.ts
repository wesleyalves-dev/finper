import { Allow, IsOptional, validate } from './'

import { OptionalIf } from './optional-if'

describe('OptionalIf', () => {
  class TestOptionalIf {
    @IsOptional()
    @Allow()
    name: string

    @OptionalIf('name')
    @Allow()
    nickname: string

    constructor({ name, nickname }: any) {
      this.name = name
      this.nickname = nickname
    }
  }

  it('espera validar um campo condicionalmente opcional', async () => {
    const nameIsProvided = new TestOptionalIf({ name: 'Test' })
    const nicknameIsProvided = new TestOptionalIf({ nickname: 'Test' })
    const bothAreProvided = new TestOptionalIf({
      name: 'Test',
      nickname: 'Test'
    })
    const noOneIsProvided = new TestOptionalIf({})

    const nameProvidedOutput = await validate(nameIsProvided)
    const nicknameProvidedOutput = await validate(nicknameIsProvided)
    const bothProvidedOutput = await validate(bothAreProvided)
    const noOneProvidedOutput = await validate(noOneIsProvided)

    expect(nameProvidedOutput).toEqual([])
    expect(nicknameProvidedOutput).toEqual([])
    expect(bothProvidedOutput).toEqual([])
    expect(noOneProvidedOutput).toHaveLength(1)
  })
})
