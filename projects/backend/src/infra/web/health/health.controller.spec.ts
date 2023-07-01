import { HealthController } from './health.controller'

describe('HealthController', () => {
  const healthController = new HealthController()

  describe('check', () => {
    it('espera retornar success true', () => {
      const output = healthController.check()

      expect(output).toMatchObject({ success: true })
    })
  })
})
