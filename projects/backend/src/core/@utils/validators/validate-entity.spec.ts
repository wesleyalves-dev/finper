import { IsString } from './'

import { validateEntity } from './validate-entity'

describe('validateEntity', () => {
  class TestValidateEntity {
    @IsString()
    name: string

    constructor(name: any) {
      Object.assign(this, { name })
    }
  }

  it('espera validar um objeto', async () => {
    const validEntity = new TestValidateEntity('Test')
    const invalidEntity = new TestValidateEntity(123)

    await validateEntity(validEntity)
    const badOutput = async (): Promise<void> => {
      await validateEntity(invalidEntity)
    }

    await expect(badOutput()).rejects.toThrow()
  })
})
