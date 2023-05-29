import { isAfter } from './is-after'

const cases: Array<[Date, boolean]> = [
  [new Date(2023, 4, 28), false],
  [new Date(2023, 4, 29), false],
  [new Date(2023, 4, 30), true]
]

describe('IsAfter', () => {
  test.each(cases)('espera que retornar %b', (date, expected) => {
    const compare = (): Date => new Date(2023, 4, 29)

    const output = isAfter(compare, date)

    expect(output).toBe(expected)
  })
})
