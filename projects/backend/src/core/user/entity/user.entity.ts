import { Entity } from '@core/@shared/entity'
import { pass } from '@core/@utils/pass'

import { UserValidation } from './user.validation'

export interface UserData {
  fullName: string
  document: string
  username: string
  password: string
}

export class User extends Entity {
  private _fullName: string

  private _document: string

  private _username: string

  private _password: string

  constructor(data: UserData, id?: string, createdAt?: Date, updatedAt?: Date) {
    super(id, createdAt, updatedAt)
    this.validate(data)
    this.setData(data)
  }

  private validate(data: Partial<UserData>): void {
    new UserValidation(data).validate()
  }

  private setData(data: Partial<UserData>): void {
    const fullName = data.fullName ?? this._fullName
    const username = data.username ?? this._username
    const document = data.document ?? this._document
    const password = data.password ?? this._password

    this._fullName = fullName
    this._username = username.toLowerCase()
    this._document = document
    this._password = password
  }

  get fullName(): string {
    return this._fullName
  }

  get document(): string {
    return this._document
  }

  get username(): string {
    return this._username
  }

  get password(): string {
    return this._password
  }

  async hashPassword(): Promise<void> {
    this._password = await pass.hash(this._password)
  }

  async comparePassword(value: string): Promise<boolean> {
    return pass.compare(value, this._password)
  }

  async update(data: Partial<UserData>): Promise<void> {
    this.validate({
      fullName: data.fullName ?? this._fullName,
      username: data.username ?? this._username,
      document: data.document ?? this._document,
      password: data.password ?? this._password
    })

    this.setData(data)
    await this.hashPassword()
  }
}
