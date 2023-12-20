import { validate } from './'

import { IsCpf } from './is-cpf'

describe('IsCpf', () => {
  class TestIsCpf {
    @IsCpf()
    value: string

    constructor(value: string) {
      this.value = value
    }
  }

  it('espera validar CPF', async () => {
    const validCpf = new TestIsCpf('16343485082')
    const validCpfWithMask = new TestIsCpf('163.434.850-82')
    const inValidCpf = new TestIsCpf('12345678900')

    const validOutput = await validate(validCpf)
    const validWithMaskOutput = await validate(validCpfWithMask)
    const invalidOutput = await validate(inValidCpf)

    expect(validOutput).toEqual([])
    expect(validWithMaskOutput).toHaveLength(1)
    expect(invalidOutput).toHaveLength(1)
  })
})
