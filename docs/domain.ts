type ID = string

type AssetType = 'ACAO' | 'FII' | 'STOCK' | 'BDR' | 'REIT'

type Ticker = string

type Currency = { currency: 'BRL' | 'USD'; value: number; quotation?: number }

type OrderType = 'B' | 'S'

interface User {
  id: ID
  fullName: string
  document: string
  username: string
  password: string
  createdAt: Date
  updatedAt: Date
}

interface Company {
  id: ID
  name: string
  document?: string
  isForeigner: boolean
  createdAt: Date
  updatedAt: Date
}

interface Asset {
  id: ID
  ticker: Ticker
  type: AssetType
  price: Currency
  isForeigner: boolean
  companyId?: ID // Company ID reference
  exchangeId?: ID // Company ID reference
  managerId?: ID // Company ID reference
  createdAt: Date
  updatedAt: Date
}

interface Custody {
  id: ID
  assetId: ID // Asset ID reference
  brokerId: ID // Company ID reference
  quantity: number
  averagePrice: Currency
  createdAt: Date
  updatedAt: Date
}

interface Order {
  id: ID
  brokerId: ID // Company ID reference
  assetId: ID // Asset ID reference
  date: Date
  type: OrderType
  price: Currency
  quantity: number
  createdAt: Date
  updatedAt: Date
}

interface UserUseCases {
  get(): User
}

interface SessionUseCases {
  signIn(credentials: object): object
  signOut(token: string): void
  refresh(token: string): object
}

interface CompanyUseCases {
  listCompanies(): Company[]
  getCompany(id: ID): Company
  createCompany(data: Partial<Company>): void
  updateCompany(id: ID, data: Partial<Company>): void
  deleteCompany(id: ID): void
}

interface AssetUseCases {
  listAssets(): Asset[]
  getAsset(id: ID): Asset
  createAsset(data: Partial<Asset>): void
  updateAsset(id: ID, data: Partial<Asset>): void
  refreshAssetPrice(id: ID): void
  deleteAsset(id: ID): void
}

interface CustodyUseCases {
  listCustodies(): Custody[]
  getCustody(id: ID): Custody
}

interface OrderUseCases {
  listOrders(): Order[]
  getOrder(id: ID): Order
  createOrder(data: Partial<Order>): void
  updateOrder(id: ID, data: Partial<Order>): void
  deleteOrder(id: ID): void
}
