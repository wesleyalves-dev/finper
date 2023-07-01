import request from 'supertest'
import { Test } from '@nestjs/testing'
import type { INestApplication } from '@nestjs/common'
import cookies from 'cookie-parser'

import { SignInUseCase, SignOutUseCase, RefreshUseCase } from '@core/session'

import { SessionModule } from './session.module'
import {
  createSignInUseCaseMock,
  createSignOutUseCaseMock,
  createRefreshUseCaseMock
} from './test'

describe('SessionController', () => {
  let app: INestApplication
  let server: any

  beforeAll(async () => {
    const signInUseCaseMocked = createSignInUseCaseMock()
    const signOutUseCaseMocked = createSignOutUseCaseMock()
    const refreshUseCaseMocked = createRefreshUseCaseMock()
    const moduleRef = await Test.createTestingModule({
      imports: [SessionModule]
    })
      .overrideProvider('Database')
      .useValue({})
      .overrideProvider('UserRepository')
      .useValue({})
      .overrideProvider('SessionRepository')
      .useValue({})
      .overrideProvider('SessionToken')
      .useValue({})
      .overrideProvider(SignInUseCase)
      .useValue(signInUseCaseMocked)
      .overrideProvider(SignOutUseCase)
      .useValue(signOutUseCaseMocked)
      .overrideProvider(RefreshUseCase)
      .useValue(refreshUseCaseMocked)
      .compile()
    app = moduleRef.createNestApplication()
    app.use(cookies())
    await app.init()
    server = app.getHttpServer()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('POST /session/sign-in', () => {
    it('espera retornar os tokens de acesso e de atualização', async () => {
      const response = await request(server)
        .post('/session/sign-in')
        .send({ username: 'john.doe', password: '1234' })
        .expect(201)
        .expect({ accessToken: 'fake-access-token' })

      const cookies = response.headers['set-cookie']
      const hasRefreshToken = cookies[0].startsWith(
        '@finper/token=fake-refresh-token; Max-Age=43200; Path=/; Expires='
      )

      expect(cookies).toHaveLength(1)
      expect(hasRefreshToken).toBe(true)
    })
  })

  describe('PUT /session/sign-out', () => {
    it('espera remover o token de atualização', async () => {
      const response = await request(server)
        .put('/session/sign-out')
        .expect(200)
        .expect({ success: true })

      const cookies = response.headers['set-cookie']
      const doNotHasRefreshToken = cookies[0].startsWith(
        '@finper/token=; Path=/; Expires='
      )

      expect(cookies).toHaveLength(1)
      expect(doNotHasRefreshToken).toBe(true)
    })
  })

  describe('PUT /session/refresh', () => {
    it('espera retornar um novo token e acesso', async () => {
      await request(server)
        .put('/session/refresh')
        .set(
          'Cookie',
          '@finper/token=fake-refresh-token; Max-Age=43200; Path=/;'
        )
        .expect(200)
        .expect({ accessToken: 'fake-access-token' })
    })
  })
})
