import type { DataSource } from 'typeorm'

import { Database } from '@core/@shared/database'

export class TypeOrmDatabase extends Database<DataSource> {
  constructor(readonly driver: DataSource) {
    super()
  }

  get connected(): boolean {
    return this.driver.isInitialized
  }

  async connect(): Promise<void> {
    await this.driver.initialize()
  }

  async disconnect(): Promise<void> {
    await this.driver.destroy()
  }
}
