import { Test } from '@nestjs/testing'
import type { INestApplication } from '@nestjs/common'
import request from 'supertest'
import cookies from 'cookie-parser'

import {
  type UserRepository,
  UserInMemoryRepository,
  UserBuilder,
  PasswordBuilder,
  SessionBuilder
} from '@core/user'

import { AppModule } from '@infra/web/app.module'

describe('/auth', () => {
  let app: INestApplication
  let userRepository: UserRepository
  const userBuilder = new UserBuilder()
  const passwordBuilder = new PasswordBuilder()
  const sessionBuilder = new SessionBuilder()
  const userData = {
    id: '56ad6cbe-1a83-4f08-b44f-57b53a5417a9',
    username: 'johndoe@example.com',
    password: '9PioJ4q$3z6T@ft'
  }
  const sessionData = {
    token: '240fe0cd-c290-49a3-978c-7f553b5e305d'
  }
  const accessTokenCookie = `@finper/access-token=fake-access-token; Max-Age=43200; Path=/; HttpOnly`
  const refreshTokenCookie = `@finper/refresh-token=${sessionData.token}; Max-Age=43200; Path=/; HttpOnly`

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideProvider('UserRepository')
      .useClass(UserInMemoryRepository)
      .overrideProvider('AccessTokenService')
      .useValue({
        generate: () => 'fake-access-token',
        verify: () => ({ success: true, payload: { userId: userData.id } })
      })
      .compile()
    app = module.createNestApplication()
    app.use(cookies())
    await app.init()

    userRepository = app.get('UserRepository')
  })

  beforeEach(async () => {
    await userRepository.clean?.()
    const password = await passwordBuilder
      .withPassword(userData.password)
      .build()
    const session = await sessionBuilder.withToken(sessionData.token).build()
    const user = await userBuilder
      .withId(userData.id)
      .withUsername(userData.username)
      .withPassword(password)
      .withSessions([session])
      .build()
    await userRepository.save(user)
  })

  afterAll(async () => {
    await app.close()
  })

  describe('POST /auth/sign-in', () => {
    it('espera definir cookies de sessão', async () => {
      const { username, password } = userData
      const response = await request(app.getHttpServer())
        .post('/auth/sign-in')
        .send({ username, password })
        .expect(200)

      expect(response.headers['set-cookie'][0]).toContain(
        `@finper/access-token=fake-access-token; Max-Age=1800; Path=/; Expires=`
      )
      expect(response.headers['set-cookie'][1]).toContain(
        `@finper/refresh-token=`
      )
    })
  })

  describe('POST /auth/sign-out', () => {
    it('espera remover os cookies de sessão', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/sign-out')
        .set('Cookie', [accessTokenCookie, refreshTokenCookie])
        .expect(200)

      expect(response.headers['set-cookie'][0]).toContain(
        '@finper/access-token=; Path=/; Expires='
      )
      expect(response.headers['set-cookie'][1]).toContain(
        '@finper/refresh-token=; Path=/; Expires='
      )
    })
  })

  describe('POST /auth/refresh-session', () => {
    it('espera retornar um novo token de acesso', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/refresh-session')
        .set('Cookie', [accessTokenCookie, refreshTokenCookie])
        .expect(200)

      expect(response.headers['set-cookie'][0]).toContain(
        '@finper/access-token=fake-access-token; Max-Age=1800; Path=/; Expires='
      )
      // expect(response.headers['set-cookie'][1]).toContain(
      //   '@finper/refresh-token='
      // )
    })
  })
})
