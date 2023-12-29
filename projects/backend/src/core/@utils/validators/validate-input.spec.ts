import { MaxLength } from './'
import { ValidateInput } from './validate-input'

describe('ValidateInput', () => {
  class Input {
    @MaxLength(5)
    value: string

    constructor(values: { value: string }) {
      Object.assign(this, values)
    }
  }

  class Test {
    @ValidateInput(Input)
    async execute(input: Input): Promise<string> {
      return input.value
    }
  }

  const test = new Test()

  it('espera lançar um erro', async () => {
    const input = { value: 'more-than-five-characters' }

    const badFn = async (): Promise<void> => {
      await test.execute(input)
    }

    await expect(badFn).rejects.toThrow(Error)
  })

  it('espera passar sem erro', async () => {
    const input = { value: 'test' }

    const output = await test.execute(input)

    expect(output).toBe('test')
  })
})
