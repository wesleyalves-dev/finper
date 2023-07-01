import { IsString } from 'class-validator'

import { validateEntity } from './validate-entity'

class Test {
  @IsString()
  value: any

  constructor(value: any) {
    this.value = value
  }
}

describe('validateEntity', () => {
  it('espera passar na validação', () => {
    const test = new Test('test')

    validateEntity(test)
  })

  it('espera lançar um erro de validação', () => {
    const test = new Test(123)

    const badFn = (): void => {
      validateEntity(test)
    }

    expect(badFn).toThrowError('Validation error')
  })
})
