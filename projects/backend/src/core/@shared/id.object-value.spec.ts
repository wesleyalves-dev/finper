import { Id } from './id.object-value'

describe('Id', () => {
  it('espera criar uma instância de id com uuid aleatório', () => {
    const output = new Id()

    expect(output).toMatchObject({
      _value: expect.any(String),
      value: expect.any(String)
    })
  })

  it('espera criar uma instância de id com uuid específico', () => {
    const input = '87Cb8bc2-a8d2-4d67-b19d-7ae1ab2cfa13'

    const output = new Id(input)

    expect(output).toMatchObject({
      _value: '87cb8bc2-a8d2-4d67-b19d-7ae1ab2cfa13',
      value: '87cb8bc2-a8d2-4d67-b19d-7ae1ab2cfa13'
    })
  })

  it('espera lançar um erro quando for passado um uuid inválido', () => {
    const input = 'not-uuid'

    const badFn = (): Id => new Id(input)

    expect(badFn).toThrowError('"not-uuid" is not a valid uuid v4')
  })

  it('espera lançar um erro quando for passado um uuid com versão incorreta', () => {
    const input = '1d9d83ea-fabd-5af9-b19b-5d2e829f2587'

    const badFn = (): Id => new Id(input)

    expect(badFn).toThrowError(
      '"1d9d83ea-fabd-5af9-b19b-5d2e829f2587" is not a valid uuid v4'
    )
  })
})
