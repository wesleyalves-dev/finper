import { isPasswordOrHash } from './is-password-or-hash'

const cases: Array<[string, boolean]> = [
  ['s7NEW@spi8*asZfcWivR', true],
  ['9DbqZNC*', true],
  ['$2a$10$eNO9YGOgr5A8b1cZoDCmau/JRVie4PNbb0MH726gYn709LUlGWng2', true],
  ['$2a$10$GhHiUgG3NjfO0vR8dluLxOcHPEhcfNoMRwEncf9C1E9koTZ4Jga7S', true],
  ['12345678', false],
  ['abcdefgh', false],
  ['123abc', false],
  ['1aA@', false],
  ['$GhHiUgG3NjfO0vR8dluLxOcHPEhcfNoMRwEncf9C1E9koTZ4Jga7S', false],
  ['$3a$10$eNO9YGOgr5A8b1cZoDCmau/JRVie4PNbb0MH726gYn709LUlGWng2', false],
  ['$2a$aa$eNO9YGOgr5A8b1cZoDCmau/JRVie4PNbb0MH726gYn709LUlGWng2', false],
  ['$2a$10$eNO9YGOgr5A8b1cZoDCmau/JRVie4PNbb0MH726gYn709LUlGWng2x', false]
]

describe('isPasswordOrHash', () => {
  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/

  test.each(cases)('espera que %s retornar %p', (value, expected) => {
    const output = isPasswordOrHash(value, pattern)

    expect(output).toBe(expected)
  })
})
