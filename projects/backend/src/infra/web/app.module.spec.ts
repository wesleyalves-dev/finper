import { Test } from '@nestjs/testing'

import { AppModule } from './app.module'

describe('AppModule', () => {
  it('espera que o AppModule funcione', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    expect(module).toBeDefined()
  })
})
