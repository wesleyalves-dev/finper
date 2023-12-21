type Id = string

export interface User {
  id: Id
  fullName: string
  document: string
  username: string
  password: Password
  sessions: Session[]
  createdAt: Date
  updatedAt: Date
}

interface Password {
  hash: string
}

interface Session {
  id: Id
  issuedAt: Date
  token: string
  expiresAt: Date
}

type CompanyType = 'Asset' | 'Exchange' | 'Broker' | 'Manager'

interface Company {
  id: Id
  name: string
  type: CompanyType
  document?: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

type AssetType = 'Fixed' | 'Variable'

type AssetClass =
  | 'Acao'
  | 'Fii'
  | 'Stock'
  | 'Bond'
  | 'ETF'
  | 'CDB'
  | 'LC'
  | 'Tesouro'
  | 'BDR'

type Currency = 'BRL' | 'USD'

interface Price {
  value: number
  currency: Currency
  tax: number
}

interface Asset {
  id: Id
  code: string
  name: string
  type: AssetType
  class: AssetClass
  price: Price
  document: string
  description?: string
  company: Company
  exchange: Company
  manager: Company
  createdAt: Date
  updatedAt: Date
}

type PositionStatus = 'Open' | 'Closed'

export interface Position {
  id: Id
  status: PositionStatus
  asset: Asset
  broker: Company
  cost: Price
  amount: number
  date: Date
  createdAt: Date
  updatedAt: Date
}
