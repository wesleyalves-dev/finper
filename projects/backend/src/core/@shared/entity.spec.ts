import { Entity } from './entity'

describe('Entity', () => {
  class TestEntity extends Entity {
    name: string
    constructor(
      { name }: { name: string },
      id?: string,
      createdAt?: Date,
      updatedAt?: Date
    ) {
      super(id, createdAt, updatedAt)
      this.name = name
    }
  }

  it('espera instanciar uma entity corretamente', () => {
    const newEntity = new TestEntity({ name: 'Test' })
    const existentEntity = new TestEntity(
      { name: 'Test' },
      'db5d56b7-085d-4e4a-ae27-e00fb0458f54',
      new Date(),
      new Date()
    )

    expect(newEntity).toMatchObject({
      name: 'Test',
      id: expect.any(Object),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    })
    expect(existentEntity).toMatchObject({
      name: 'Test',
      id: expect.any(Object),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date)
    })
  })
})
