import { DataSource, SimpleConsoleLogger } from 'typeorm'
import path from 'node:path'

import type { DatabaseConfig } from '@config/index'

import type { Database } from '../database'
import { PostgresDatabase } from './postgres.database'

export function makePostgresDatabase(
  config: DatabaseConfig
): Database<DataSource> {
  const {
    host,
    port,
    base: database,
    user: username,
    pass: password,
    log
  } = config
  const dataSource = new DataSource({
    type: 'postgres',
    host,
    port,
    database,
    username,
    password,
    migrationsRun: true,
    entities: [
      path.join(
        __dirname,
        '../../../core/**/repository/*.postgres.model.{js,ts}'
      )
    ],
    migrations: [path.join(__dirname, 'migrations/*.{js,ts}')],
    logging: log,
    logger: new SimpleConsoleLogger(log)
  })

  return new PostgresDatabase(dataSource)
}
