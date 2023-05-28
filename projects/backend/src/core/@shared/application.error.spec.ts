import { ApplicationError } from './application.error'

describe('ApplicationError', () => {
  it('espera criar uma instância de application error com code e details default', () => {
    const output = new ApplicationError('Test')

    expect(output).toMatchObject({
      message: 'Test',
      code: 'INTERNAL_SERVER_ERROR'
    })
  })

  it('espera criar uma instância de application error com code e details customizados', () => {
    const output = new ApplicationError('Test', 'VALIDATION', {
      description: 'Test'
    })

    expect(output).toMatchObject({
      message: 'Test',
      code: 'VALIDATION',
      details: { description: 'Test' }
    })
  })
})
