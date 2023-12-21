import { Id } from './id.object-value'

export abstract class Entity {
  private readonly _id: Id

  private readonly _createdAt: Date

  private _updatedAt: Date

  constructor(id?: string, createdAt?: Date, updatedAt?: Date) {
    this._id = new Id(id)
    this._createdAt = createdAt ?? new Date()
    this._updatedAt = updatedAt ?? new Date()
  }

  get id(): Id {
    return this._id
  }

  get createdAt(): Date {
    return this._createdAt
  }

  get updatedAt(): Date {
    return this._updatedAt
  }

  refreshUpdatedAt(): void {
    this._updatedAt = new Date()
  }
}
