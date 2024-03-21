export class SessionTypeOrmNested {
  id: string

  token: string

  issuedAt: Date

  expiresAt: Date

  constructor(values: SessionTypeOrmNested) {
    Object.assign(this, values)
  }
}
