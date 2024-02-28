export abstract class Database<Driver = any> {
  abstract readonly driver: Driver
  abstract readonly connected: boolean
  abstract connect(): Promise<void>
  abstract disconnect(): Promise<void>
}
