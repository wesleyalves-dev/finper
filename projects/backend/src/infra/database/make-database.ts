import { DataSource, SimpleConsoleLogger } from 'typeorm'
import path from 'node:path'

import type { DatabaseConfig } from '@config/index'

import type { Database } from './database'
import { MysqlDatabase } from './mysql'

export function makeDatabase(config: DatabaseConfig): Database<any> {
  const {
    host,
    port,
    base: database,
    user: username,
    pass: password,
    log
  } = config
  const dataSource = new DataSource({
    type: 'mysql',
    host,
    port,
    database,
    username,
    password,
    migrationsRun: true,
    entities: ['@core/**/repository/*.mysql.model.{js|ts}'],
    migrations: [path.join(__dirname, 'mysql/migrations/{*.js|*.ts}')],
    logging: log,
    logger: new SimpleConsoleLogger(log)
  })

  return new MysqlDatabase(dataSource)
}
