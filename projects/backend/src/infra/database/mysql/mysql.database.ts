import type { DataSource } from 'typeorm'

import type { Database } from '../database'

export class MysqlDatabase implements Database<DataSource> {
  constructor(readonly client: DataSource) {}

  async connect(): Promise<void> {
    await this.client.initialize()
  }

  async disconnect(): Promise<void> {
    await this.client.destroy()
  }
}
