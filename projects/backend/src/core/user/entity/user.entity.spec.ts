import { User } from './user.entity'

describe('User', () => {
  const id = 'c4600e53-9680-4c0b-94d9-bff064df7e74'
  const data = {
    fullName: 'John Doe',
    document: '08923974030',
    username: 'john.doe',
    password: 'p@s4W0rD'
  }
  const invalidData = {
    fullName: 'a',
    document: 'A8923974030',
    username: 'a',
    password: 'asdf'
  }
  const createdAt = new Date()
  const updatedAt = new Date()

  describe('constructor', () => {
    it('espera criar uma instância de user', () => {
      const output = new User(data, id, createdAt, updatedAt)

      expect(output).toMatchObject({
        fullName: data.fullName,
        document: data.document,
        username: data.username,
        password: data.password,
        createdAt,
        updatedAt
      })
      expect(output.id.value).toBe(id)
    })

    it('espera lançar um erro de validação', () => {
      const badFn = (): User => new User(invalidData, id, createdAt, updatedAt)

      expect(badFn).toThrowError('Validation error')
    })
  })

  describe('hashPassword', () => {
    it('espera criptografar a password', async () => {
      const output = new User(data, id, createdAt, updatedAt)

      await output.hashPassword()

      expect(output.password.length).toBe(60)
    })
  })

  describe('comparePassword', () => {
    it('espera retornar true quando a senha estiver correta', async () => {
      const user = new User(data, id, createdAt, updatedAt)

      await user.hashPassword()
      const output = await user.comparePassword(data.password)

      expect(output).toBe(true)
    })

    it('espera retornar false quando a senha estiver incorreta', async () => {
      const user = new User(data, id, createdAt, updatedAt)
      const incorrectPassword = 'invalid'

      await user.hashPassword()
      const output = await user.comparePassword(incorrectPassword)

      expect(output).toBe(false)
    })
  })

  describe('update', () => {
    it('espera atualizar parcialmente as propriedade', async () => {
      const user = new User(data, id, createdAt, updatedAt)
      const update = {
        fullName: 'New Name',
        document: '74061100068',
        username: 'new.username'
      }

      await user.update(update)

      expect(user).toMatchObject({
        fullName: update.fullName,
        document: update.document,
        username: update.username,
        password: expect.any(String),
        createdAt,
        updatedAt
      })
    })

    it('espera atualizar a propriedade password', async () => {
      const user = new User(data, id, createdAt, updatedAt)
      const update = {
        password: 'n3Wp@A55'
      }

      await user.update(update)

      expect(user).toMatchObject({
        fullName: data.fullName,
        document: data.document,
        username: data.username,
        password: expect.any(String),
        createdAt,
        updatedAt
      })
      expect(user.password.length).toBe(60)
    })
  })
})
