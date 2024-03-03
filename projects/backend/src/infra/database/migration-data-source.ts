import { config } from 'dotenv'
import { DataSource } from 'typeorm'
import { join } from 'node:path'
import { cwd } from 'node:process'

config({ path: join(cwd(), '../../.env') })

const dbConfig = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_BASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  entities: [],
  migrations: [join(cwd(), 'src/infra/database/migrations/*.{js,ts}')],
  synchronize: false
}

export const dataSource = new DataSource(dbConfig as any)
