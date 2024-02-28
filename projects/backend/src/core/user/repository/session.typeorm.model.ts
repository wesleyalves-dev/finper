export class SessionTypeOrmModel {
  id: string

  token: string

  issuedAt: Date

  expiresAt: Date

  constructor(values: SessionTypeOrmModel) {
    Object.assign(this, values)
  }
}
