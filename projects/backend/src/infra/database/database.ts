export interface Database<Client> {
  readonly client: Client
  connect(): Promise<void>
  disconnect(): Promise<void>
}
