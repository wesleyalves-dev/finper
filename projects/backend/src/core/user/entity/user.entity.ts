import { Entity } from '@core/@shared/entity'

import { UserValidation } from './user.validation'
import { type Password } from './password.object-value'
import { type Session } from './session.object-value'

export interface UserProps {
  fullName: string
  document: string
  username: string
  password: Password
  sessions: Session[]
}

export class User extends Entity {
  private _fullName: string

  private _document: string

  private _username: string

  private _password: Password

  private _sessions: Session[]

  private constructor(
    props: UserProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id, createdAt, updatedAt)
    this.setProps(props)
  }

  private setProps(props: UserProps): void {
    this._fullName = props.fullName ?? this._fullName
    this._document = props.document ?? this._document
    this._username = props.username ?? this._username
    this._password = props.password ?? this._password
    this._sessions = props.sessions ?? this._sessions
  }

  static async create(
    props: UserProps,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ): Promise<User> {
    const values = await new UserValidation().validate(props)
    return new User(values, id, createdAt, updatedAt)
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

  get password(): Password {
    return this._password
  }

  get sessions(): Session[] {
    return this._sessions
  }

  async update(props: Partial<UserProps>): Promise<void> {
    const update = {
      fullName: props.fullName ?? this._fullName,
      document: props.document ?? this._document,
      username: props.username ?? this._username,
      password: props.password ?? this._password,
      sessions: props.sessions ?? this._sessions
    }
    const values = await new UserValidation().validate(update)
    this.setProps(values)
    this.refreshUpdatedAt()
  }

  addSession(session: Session): void {
    this._sessions.push(session)
    this.refreshUpdatedAt()
  }

  removeSession(session: Session): void {
    this._sessions = this._sessions.filter(s => s.id.value !== session.id.value)
    this.refreshUpdatedAt()
  }
}
