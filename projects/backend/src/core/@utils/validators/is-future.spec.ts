import { validate } from './'

import { IsFuture } from './is-future'

describe('IsFuture', () => {
  class TestIsFuture {
    @IsFuture()
    value: Date

    constructor(value: Date) {
      this.value = value
    }
  }

  it('espera validar se uma data é futura', async () => {
    const validDate = new TestIsFuture(new Date(2099, 0, 1))
    const invalidDate = new TestIsFuture(new Date(2020, 0, 1))

    const validOutput = await validate(validDate)
    const invalidOutput = await validate(invalidDate)

    expect(validOutput).toEqual([])
    expect(invalidOutput).toHaveLength(1)
  })
})
