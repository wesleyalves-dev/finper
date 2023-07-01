import request from 'supertest'
import { Test } from '@nestjs/testing'
import type { INestApplication } from '@nestjs/common'

import { HealthController } from './health.controller'

describe('HealthCheck', () => {
  let app: INestApplication
  let server: any

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HealthController]
    }).compile()
    app = moduleRef.createNestApplication()
    await app.init()
    server = app.getHttpServer()
  })

  afterAll(async () => {
    await app.close()
  })

  it('GET /health', () => {
    return request(server).get('/health').expect(200).expect({ success: true })
  })
})
