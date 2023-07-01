import { errorCodeToStatusCode } from './errors'

describe('errorCodeToStatusCode', () => {
  it('espera receber um código interno de erro e retornar um status code correspondente', () => {
    const output = errorCodeToStatusCode('VALIDATION')

    expect(output).toBe(400)
  })
})
